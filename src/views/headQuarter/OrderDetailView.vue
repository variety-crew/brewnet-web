<template>
  <div class="order-detail-container">
    <template v-if="orderDetail">
      <div class="top-area">
        <Tag
          rounded
          :value="formatKoOrderStatus(orderDetail.orderStatus)"
          :severity="getOrderStatusSeverity(orderDetail.orderStatus)"
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
          <Button label="주문요청서 출력" variant="outlined" size="small" @click="clickPrintOrder" />
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
            v-if="orderDetail.managerName === userStore.username"
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
        <h1>주문상세</h1>

        <DraftApprovalLine
          class="approval-line-table"
          :draft-manager-name="orderDetail.managerName"
          :approval-lines="orderApprovalLines"
        />

        <AppTableStyled full-width>
          <tbody>
            <tr>
              <th>주문일자</th>
              <td>{{ orderDetail.createdAt }}</td>
              <th>주문지점</th>
              <td>{{ orderDetail.franchiseName }}</td>
              <th>주문금액</th>
              <td>{{ orderDetail.sumPrice.toLocaleString() }}</td>
              <th>주문담당자</th>
              <td>{{ orderDetail.managerName }}</td>
            </tr>
            <tr>
              <th>비고사항</th>
              <td colspan="7">{{ orderDetail.comment }}</td>
            </tr>
            <tr>
              <th>품목코드</th>
              <th colspan="3">품목명</th>
              <th>수량</th>
              <th>단가</th>
              <th>공급가액</th>
              <th>부가세</th>
            </tr>
            <tr v-for="item in orderDetail.orderItemList" :key="item.itemCode">
              <td class="align-center">{{ item.itemCode }}</td>
              <td colspan="3">{{ item.name }}</td>
              <td class="align-right">{{ item.quantity.toLocaleString() }}</td>
              <td class="align-right">{{ (item.partSum / item.quantity).toLocaleString() }}</td>
              <td class="align-right">{{ item.partSum.toLocaleString() }}</td>
              <td class="align-right">{{ (item.partSum * 0.1).toLocaleString() }}</td>
            </tr>
            <tr>
              <th>총 주문금액</th>
              <td class="align-right" colspan="7">{{ totalPrice.toLocaleString() }}</td>
            </tr>
          </tbody>
        </AppTableStyled>
      </div>

      <DraftApprovalHistoryTable
        :approval-lines="orderApprovalLines"
        :draft-kind="DRAFT_KIND.ORDER"
        :draft-code="orderCode"
        @complete-approval="onCompleteApproval"
      />

      <DynamicDialog />
    </template>
  </div>
</template>

<script setup>
import { useToast } from 'primevue';
import { computed, defineAsyncComponent, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import AppTableStyled from '@/components/common/AppTableStyled.vue';
import DraftApprovalHistoryTable from '@/components/headQuarter/DraftApprovalHistoryTable.vue';
import DraftApprovalLine from '@/components/headQuarter/DraftApprovalLine.vue';
import { useAppConfirmModal } from '@/hooks/useAppConfirmModal';
import { useModal } from '@/hooks/useModal';
import { useUserStore } from '@/stores/user';
import HQOrderApi from '@/utils/api/HQOrderApi';
import { DRAFT_KIND, ORDER_STATUS } from '@/utils/constant';
import { formatKoOrderStatus } from '@/utils/format';
import { getOrderStatusSeverity } from '@/utils/helper';

const ApprovalRequestModalBody = defineAsyncComponent(
  () => import('@/components/headQuarter/ApprovalRequestModalBody.vue'),
);

const userStore = useUserStore();
const route = useRoute();
const router = useRouter();
const { showConfirm } = useAppConfirmModal();
const toast = useToast();
const { openModal } = useModal();

const orderDetail = ref(null);
const orderApprovalLines = ref([]);
const disabledCancelButton = computed(() => {
  // PENDING 상태일 때만 결재취소(기안자가) 가능하므로
  // PENDING 상태가 아니면 결재취소 버튼 disabled
  return orderDetail.value.orderStatus !== ORDER_STATUS.PENDING;
});

const isRequested = computed(() => {
  return orderDetail.value.orderStatus === ORDER_STATUS.REQUESTED;
});

const isCompleted = computed(() => {
  return orderDetail.value.orderStatus === ORDER_STATUS.SHIPPED;
});

const hqOrderApi = new HQOrderApi();
const { orderCode } = route.params;
const totalPrice = computed(() => {
  if (orderDetail.value && orderDetail.value.orderItemList) {
    const totalPartSum = orderDetail.value.orderItemList.reduce((sum, item) => {
      return sum + item.partSum;
    }, 0);
    return (totalPartSum * 1.1).toLocaleString();
  }
  return '0';
});

const getOrderDetailPageData = () => {
  hqOrderApi.getOrderDetail(orderCode).then(data => {
    orderDetail.value = data;
  });

  hqOrderApi.getOrderApprovalLines(orderCode).then(data => {
    orderApprovalLines.value = data.map(e => ({ ...e, positionName: e.position, approverCode: e.approverMemberCode }));
  });
};

const handleRequestApproval = (approverCode, comment) => {
  hqOrderApi.requestApproval({ orderCode, superManagerMemberCode: approverCode, comment }).then(() => {
    toast.add({
      severity: 'success',
      summary: '처리 성공',
      detail: '주문에 대한 결재요청이 등록되었습니다.',
      life: 3000,
    });

    // page reload
    getOrderDetailPageData();
  });
};

const clickRequestApproval = () => {
  openModal({
    component: ApprovalRequestModalBody,
    header: '결재요청',
    data: {
      draftKind: DRAFT_KIND.ORDER,
    },
    onClose: opt => {
      const callbackParams = opt.data;
      if (!callbackParams) return;

      const { approverCode, comment } = callbackParams;

      handleRequestApproval(approverCode, comment);
    },
  });
};

const clickPrintOrder = () => {
  // TODO:: 주문요청서 출력
};

const clickPrintInvoice = () => {
  // TODO:: 거래명세서 출력
};

const clickGoToList = () => {
  router.replace({ name: 'hq:order:list' });
};

const cancelOrder = () => {
  hqOrderApi.cancelApproval(orderCode).then(() => {
    toast.add({ severity: 'error', summary: '처리 성공', detail: '결재 요청이 취소되었습니다.', life: 3000 });

    // page reload
    getOrderDetailPageData();
  });
};

const clickCancel = () => {
  showConfirm({
    header: '결재 요청 취소',
    message: '결재 요청을 취소하시겠습니까?',
    acceptLabel: '결재 요청 취소',
    onAccept: cancelOrder,
    danger: true,
  });
};

const onCompleteApproval = () => {
  getOrderDetailPageData();
};

onMounted(() => {
  // 주문 상세 데이터 셋팅
  getOrderDetailPageData();
});
</script>

<style scoped>
.order-detail-container {
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
