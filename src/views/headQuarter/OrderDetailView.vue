<template>
  <div class="order-detail-container">
    <template v-if="orderDetail">
      <div class="top-area">
        <!-- <Tag
          rounded
          :value="formatKoApproval(orderDetail.approvalStatus)"
          :severity="getApprovalStatusSeverity(orderDetail.approvalStatus)"
          class="mb-1"
        /> -->
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
          <Button
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

        <table class="approval-line-table">
          <tr>
            <th>기안자</th>
            <th>결재자</th>
          </tr>
          <tr>
            <td>{{ orderDetail.managerName }}</td>
            <td></td>
          </tr>
        </table>

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

      <div>
        <h4 class="mb-1">결재이력</h4>
        <AppTableStyled full-width>
          <thead>
            <tr>
              <th>직급</th>
              <th>결재자</th>
              <th>결재상태</th>
              <th>비고사항</th>
              <th>결재일시</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="approvalLine in orderApprovalLines" :key="approvalLine.approverCode">
              <td class="align-center">{{ formatKoEmployeePosition(approvalLine.position) }}</td>
              <td class="align-center">{{ approvalLine.approverName }}</td>
              <td class="align-center">{{ formatKoApprovalStatus(approvalLine.approved) }}</td>
              <td class="align-center">{{ approvalLine.comment }}</td>
              <td class="align-center">{{ approvalLine.createdAt }}</td>
            </tr>
          </tbody>
        </AppTableStyled>
      </div>
    </template>
  </div>
</template>

<script setup>
import { useToast } from 'primevue';
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import AppTableStyled from '@/components/common/AppTableStyled.vue';
import { useAppConfirmModal } from '@/hooks/useAppConfirmModal';
import { useUserStore } from '@/stores/user';
import HQOrderApi from '@/utils/api/HQOrderApi';
import { ORDER_STATUS } from '@/utils/constant';
import { formatKoApproval, formatKoApprovalStatus, formatKoEmployeePosition } from '@/utils/format';
import { getApprovalStatusSeverity } from '@/utils/helper';
import LocalStorageUtil from '@/utils/localStorage';

const userStore = useUserStore();
const route = useRoute();
const router = useRouter();
const { showConfirm } = useAppConfirmModal();
const toast = useToast();

const orderDetail = ref(null);
const orderApprovalLines = ref([]);
const disabledCancelButton = computed(() => {
  return orderDetail.value.managerName !== useUserStore.username;
});

const isRequested = computed(() => {
  return orderDetail.value.approvalStatus === ORDER_STATUS.REQUESTED;
});

const isCompleted = computed(() => {
  return orderDetail.value.approvalStatus === ORDER_STATUS.SHIPPED;
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

const clickRequestApproval = () => {
  // TODO:: 결재요청
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
  // TODO:: 결재 요청 취소 API

  toast.add({ severity: 'error', summary: '처리 성공', detail: '결재 요청이 취소되었습니다.', life: 3000 });
  router.replace({ name: 'hq:order:list' });
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

onMounted(() => {
  // 주문 상세 데이터 셋팅
  hqOrderApi.getOrderDetail(orderCode).then(data => {
    orderDetail.value = data;
  });

  hqOrderApi.getOrderApprovalLines(orderCode).then(data => {
    orderApprovalLines.value = data;
  });
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

      th {
        border: 1px solid black;
        padding: 3px 0;
        font-size: 13px;
        width: 70px;
      }
      td {
        border: 1px solid black;
        font-size: 13px;
        text-align: center;
      }

      & > tr:nth-child(2) {
        height: 50px;
      }
    }
  }
}
</style>
