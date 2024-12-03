<template>
  <div v-if="returnDetail" class="return-detail-container">
    <div class="top-area">
      <Tag
        :value="formatKoReturnStatus(returnDetail.status)"
        :severity="getReturnStatusSeverity(returnDetail.status)"
        class="status"
      />
      <div class="top-buttons">
        <Button label="목록으로" size="small" severity="secondary" variant="outlined" @click="clickGoToList" />
        <Button
          label="결재요청하기"
          variant="outlined"
          size="small"
          :disabled="returnDetail.status !== RETURN_STATUS.REQUESTED"
          @click="clickRequestApproval"
        />
        <!-- <Button label="주문요청서 출력" variant="outlined" size="small" @click="clickPrintOrder" /> -->
        <!-- <Button
          label="거래명세서 출력"
          variant="outlined"
          size="small"
          :disabled="!isCompleted"
          @click="clickPrintInvoice"
        /> -->

        <!-- 기안 담당자인 경우에만 결재요청취소 버튼 표시 -->
        <Button
          v-if="returnDetail.memberName === userStore.username"
          label="결재요청취소"
          severity="danger"
          size="small"
          variant="outlined"
          :disabled="returnDetail.status !== RETURN_STATUS.PENDING"
          @click="clickCancelRequestApproval"
        />
      </div>
    </div>

    <h1 class="title">반품 요청서</h1>

    <DraftApprovalLine
      class="approval-line-table"
      :draft-manager-name="returnDetail.memberName"
      :approval-lines="approverList"
    />

    <AppTableStyled>
      <tbody>
        <tr>
          <th>반품요청지점</th>
          <td>{{ returnDetail.franchiseName }}</td>
          <th>반품요청일</th>
          <td>{{ returnDetail.createdAt }}</td>
          <th>반품담당자</th>
          <td>{{ returnDetail.memberName }}</td>
        </tr>
        <tr>
          <th>반품사유</th>
          <td colspan="5" class="align-center">{{ formatKoReturnReason(returnDetail.reason) }}</td>
        </tr>
        <tr>
          <th>반품 상세사유</th>
          <td colspan="5" class="align-center">{{ returnDetail.explanation }}</td>
        </tr>
        <tr>
          <th :rowspan="returnDetail.returningItemList.length + 1">반품품목</th>
          <th>품목코드</th>
          <th colspan="2">품목명</th>
          <th>카테고리</th>
          <th>수량</th>
        </tr>
        <tr v-for="returnItem in returnDetail.returningItemList" :key="returnItem.itemCode">
          <td class="align-center">{{ returnItem.itemUniqueCode }}</td>
          <td class="align-center" colspan="2">{{ returnItem.itemName }}</td>
          <td class="align-center">{{ returnItem.superCategory }} - {{ returnItem.subCategory }}</td>
          <td class="align-center">{{ returnItem.quantity.toLocaleString() }}</td>
        </tr>
      </tbody>
    </AppTableStyled>

    <div>
      <AppLabel use-margin-bottom label="반품 품목 사진" />
      <AppImageList :images="returnDetail.returningImageList" />
    </div>

    <AppLabelText v-if="returnDetail.memberName" label="기안자 비고사항" :text="returnDetail.comment || ''" />

    <DraftApprovalHistoryTable
      :approval-lines="approverList"
      :draft-kind="DRAFT_KIND.RETURN"
      :draft-code="returnCode"
      @complete-approval="onCompleteApproval"
    />

    <DynamicDialog />
  </div>
</template>

<script setup>
import { useToast } from 'primevue';
import { defineAsyncComponent, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import AppImageList from '@/components/common/AppImageList.vue';
import AppLabel from '@/components/common/AppLabel.vue';
import AppLabelText from '@/components/common/AppLabelText.vue';
import AppTableStyled from '@/components/common/AppTableStyled.vue';
import DraftApprovalHistoryTable from '@/components/headQuarter/DraftApprovalHistoryTable.vue';
import DraftApprovalLine from '@/components/headQuarter/DraftApprovalLine.vue';
import { useAppConfirmModal } from '@/hooks/useAppConfirmModal';
import { useModal } from '@/hooks/useModal';
import { useUserStore } from '@/stores/user';
import HQReturnApi from '@/utils/api/HQReturnApi';
import { DRAFT_KIND, DRAFTER_APPROVED, RETURN_STATUS } from '@/utils/constant';
import { formatKoReturnReason, formatKoReturnStatus } from '@/utils/format';
import { getReturnStatusSeverity } from '@/utils/helper';

const ApprovalRequestModalBody = defineAsyncComponent(
  () => import('@/components/headQuarter/ApprovalRequestModalBody.vue'),
);

const route = useRoute();
const { returnCode } = route.params;
const router = useRouter();
const { openModal } = useModal();
const userStore = useUserStore();
const toast = useToast();
const { showConfirm } = useAppConfirmModal();

const returnDetail = ref(null);
const approverList = ref([]);

const hqReturnApi = new HQReturnApi();

const getPageData = () => {
  // 반품 상세 조회
  hqReturnApi.getReturnDetail(returnCode).then(data => {
    returnDetail.value = data;
  });

  // 결재자 목록 조회
  hqReturnApi.getReturnApproverList(returnCode).then(data => {
    approverList.value = data.map(e => ({ ...e, positionName: e.position, approved: e.approval }));
  });
};

const onCompleteApproval = () => {
  getPageData();
};

const clickGoToList = () => {
  router.push({ name: 'hq:order:return:list' });
};

const handleRequestApproval = (approverCode, comment) => {
  hqReturnApi.requestApproval({ returnCode, approved: DRAFTER_APPROVED.APPROVE, comment, approverCode }).then(() => {
    toast.add({
      severity: 'success',
      summary: '처리 성공',
      detail: '반품에 대한 결재요청이 등록되었습니다.',
      life: 3000,
    });
    // page reload
    getPageData();
  });
};

const clickRequestApproval = () => {
  openModal({
    component: ApprovalRequestModalBody,
    header: '결재요청',
    data: {
      draftKind: DRAFT_KIND.RETURN,
    },
    onClose: opt => {
      const callbackParams = opt.data;
      if (!callbackParams) return;

      const { approverCode, comment } = callbackParams;

      handleRequestApproval(approverCode, comment);
    },
  });
};

const cancelRequestApproval = () => {
  hqReturnApi.cancelRequestApproval(returnCode).then(() => {
    toast.add({ severity: 'error', summary: '처리 성공', detail: '결재 요청이 취소되었습니다.', life: 3000 });

    // page reload
    getPageData();
  });
};

const clickCancelRequestApproval = () => {
  showConfirm({
    header: '결재 요청 취소',
    message: '결재 요청을 취소하시겠습니까?',
    acceptLabel: '결재 요청 취소',
    onAccept: cancelRequestApproval,
    danger: true,
  });
};

onMounted(() => {
  getPageData();
});
</script>

<style scoped>
.return-detail-container {
  display: flex;
  flex-direction: column;
  gap: 24px;

  .top-area {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .top-buttons {
      display: flex;
      gap: 5px;
    }
  }

  .title {
    align-self: center;
  }

  .content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }

  .approval-line-table {
    align-self: flex-end;
  }
}
</style>
