<template>
  <div class="exchange-detail-container">
    <template v-if="exchangeDetail">
      <div class="top-area">
        <Tag
          rounded
          :value="formatKoExchangeStatus(exchangeDetail.status)"
          :severity="getExchangeStatusSeverity(exchangeDetail.exchangeStatus)"
          class="mb-1"
        />
        <div class="top-buttons">
          <Button
            label="결재요청하기"
            variant="outlined"
            size="small"
            :disabled="!isRequested"
            @click="clickRequestApproval"
          />
          <Button label="교환요청서 출력" variant="outlined" size="small" @click="clickPrintExchange" />
          <Button
            label="거래명세서 출력"
            variant="outlined"
            size="small"
            :disabled="!isCompleted"
            @click="clickPrintInvoice"
          />
          <Button label="목록으로" size="small" severity="secondary" variant="outlined" @click="clickGoToList" />

          <!-- 기안 담당자인 경우에만 결재요청취소 버튼 표시 -->
          <Button
            v-if="exchangeDetail.managerName === userStore.username"
            label="결재요청취소"
            severity="danger"
            size="small"
            variant="outlined"
            :disabled="disabledCancelButton"
            @click="clickCancel"
          />
        </div>
      </div>

      <div class="body-area">
        <h1>교환상세</h1>
        <div style="margin-bottom: 2%"></div>

        <AppTableStyled full-width>
          <tbody>
            <tr>
              <th>주문번호</th>
              <td>{{ exchangeDetail.exchangeCode }}</td>
              <th>교환사유</th>
              <td colspan="3">{{ formatKoExchangeReason(exchangeDetail.reason) }}</td>
              <th>교환신청일자</th>
              <td colspan="2">{{ exchangeDetail.createdAt }}</td>
            </tr>
            <tr>
              <th>교환사유 설명</th>
              <td colspan="8">{{ exchangeDetail.explanation }}</td>
            </tr>
            <tr>
              <th colspan="8">교환품목</th>
            </tr>
            <tr>
              <th>품목코드</th>
              <th colspan="3">품목명</th>
              <th>수량</th>
              <th>단가</th>
              <th>주문금액</th>
              <th>부가세</th>
            </tr>
            <tr v-for="item in exchangeDetail.exchangeItemList" :key="item.itemCode">
              <td class="align-center">{{ item.itemUniqueCode }}</td>
              <td colspan="3">{{ item.itemName }}</td>
              <td class="align-right">{{ item.quantity.toLocaleString() }}</td>
              <td class="align-right">{{ item.sellingPrice.toLocaleString() }}</td>
              <td class="align-right">{{ (item.quantity * item.sellingPrice).toLocaleString() }}</td>
              <td class="align-right">{{ (item.quantity * item.sellingPrice * 0.1).toLocaleString() }}</td>
            </tr>
            <tr>
              <th>금액합계</th>
              <td class="align-right" colspan="7">{{ totalPrice.toLocaleString() }}</td>
            </tr>
          </tbody>
          <div style="margin-bottom: 10%"></div>

          <h4 class="mb-1">첨부파일</h4>
          <div v-for="(image, index) in exchangeDetail.exchangeImageList" :key="index">
            <Image :src="image" alt="교환 상품 이미지" width="200" preview />
          </div>
        </AppTableStyled>
      </div>
    </template>
  </div>
</template>

<script setup>
import { useToast } from 'primevue';
import { computed, defineAsyncComponent, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import ExchangeDetailTable from '@/components/headQuarter/ExchangeDetailTable.vue';
import { useAppConfirmModal } from '@/hooks/useAppConfirmModal';
import { useModal } from '@/hooks/useModal';
import { useUserStore } from '@/stores/user';
import FCExchangeApi from '@/utils/api/FCExchangeApi';
import { DRAFT_KIND, EXCHANGE_STATUS } from '@/utils/constant';
import { formatKoExchangeReason, formatKoExchangeStatus } from '@/utils/format';
import { getExchangeStatusSeverity } from '@/utils/helper';

// import PrintExchangePdfPreviewModal from '@/components/headQuarter/PrintExchangePdfPreviewModal.vue';

const ApprovalRequestModalBody = defineAsyncComponent(
  () => import('@/components/headQuarter/ApprovalRequestModalBody.vue'),
);

const userStore = useUserStore();
const route = useRoute();
const router = useRouter();
const { showConfirm } = useAppConfirmModal();
const toast = useToast();
const { openModal } = useModal();

const totalPrice = ref(null);

const exchangeDetail = ref(null);
const exchangeApprovalLines = ref([]);
const disabledCancelButton = computed(() => {
  // PENDING 상태일 때만 결재취소(기안자가) 가능하므로
  // PENDING 상태가 아니면 결재취소 버튼 disabled
  return exchangeDetail.value.status !== EXCHANGE_STATUS.PENDING;
});

const isRequested = computed(() => {
  return exchangeDetail.value.status === EXCHANGE_STATUS.REQUESTED;
});

const isCompleted = computed(() => {
  return exchangeDetail.value.status === EXCHANGE_STATUS.SHIPPED;
});

const fcExchangeApi = new FCExchangeApi();
const { exchangeCode } = route.params;

const showPrintPdf = ref(false);

const getExchangeDetailPageData = () => {
  fcExchangeApi.getExchangeDetail(exchangeCode).then(data => {
    exchangeDetail.value = data;
    totalPrice.value = exchangeDetail.value.exchangeItemList.reduce((total, item) => {
      return total + item.quantity * item.sellingPrice;
    }, 0);
  });
};

const handleRequestApproval = (approverCode, comment) => {
  hqExchangeApi.requestApproval({ exchangeCode, superManagerMemberCode: approverCode, comment }).then(() => {
    toast.add({
      severity: 'success',
      summary: '처리 성공',
      detail: '교환에 대한 결재요청이 등록되었습니다.',
      life: 3000,
    });

    // page reload
    getExchangeDetailPageData();
  });
};

const clickRequestApproval = () => {
  openModal({
    component: ApprovalRequestModalBody,
    header: '결재요청',
    data: {
      draftKind: DRAFT_KIND.EXCHANGE,
    },
    onClose: opt => {
      const callbackParams = opt.data;
      if (!callbackParams) return;

      const { approverCode, comment } = callbackParams;

      handleRequestApproval(approverCode, comment);
    },
  });
};

const clickPrintExchange = () => {
  // TODO:: 교환요청서 출력
  showPrintPdf.value = true;
};

const clickPrintInvoice = () => {
  // TODO:: 거래명세서 출력
  showPrintPdf.value = true;
};

const clickGoToList = () => {
  router.replace({ name: 'hq:order:exchange:list' });
};

const cancelExchange = () => {
  hqExchangeApi.cancelApproval(exchangeCode).then(() => {
    toast.add({ severity: 'error', summary: '처리 성공', detail: '결재 요청이 취소되었습니다.', life: 3000 });

    // page reload
    getExchangeDetailPageData();
  });
};

const clickCancel = () => {
  showConfirm({
    header: '결재 요청 취소',
    message: '결재 요청을 취소하시겠습니까?',
    acceptLabel: '결재 요청 취소',
    onAccept: cancelExchange,
    danger: true,
  });
};

const onCompleteApproval = () => {
  getExchangeDetailPageData();
};

onMounted(() => {
  // 교환 상세 데이터 셋팅
  getExchangeDetailPageData();
});
</script>

<style scoped>
.exchange-detail-container {
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

  .body-area {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;

    .approval-line-table {
      align-self: flex-end;
    }
  }
}
</style>
