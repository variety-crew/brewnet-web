<template>
  <div class="exchange-detail-container">
    <template v-if="exchangeOtherDetail">
      <div class="top-area">
        <Tag
          rounded
          :value="formatKoExchangeOtherStatus(exchangeOtherDetail.status)"
          :severity="getExchangeStatusSeverity(exchangeOtherDetail.exchangeStatus)"
          class="mb-1"
        />
        <div class="top-buttons">
          <Button
            label="재고조정"
            variant="outlined"
            size="small"
            :disabled="!isRequested"
            @click="clickRequestApproval"
          />
          <Button label="교환완료" variant="outlined" size="small" @click="clickPrintExchange" />
          <Button
            label="교환보기"
            variant="outlined"
            size="small"
            :disabled="!isCompleted"
            @click="clickPrintInvoice"
          />
          <Button label="처리내역출력" variant="outlined" size="small" @click="clickGoToList" />
          <Button label="목록으로" size="small" severity="secondary" variant="outlined" @click="clickGoToList" />

          <!-- 기안 담당자인 경우에만 결재요청취소 버튼 표시 -->
          <Button
            v-if="exchangeOtherDetail.managerName === userStore.username"
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
        <h1>교환처리내역</h1>

        <!-- <DraftApprovalLine
          class="approval-line-table"
          :draft-manager-name="exchangeDetail.memberName"
          :approval-lines="exchangeApprovalLines"
        /> -->

        <div style="margin-bottom: 2%"></div>

        <ExchangeOtherDetailTable v-if="exchangeOtherDetail" :exchange-other-detail="exchangeOtherDetail" />
      </div>

      <!-- <DraftApprovalHistoryTable
        :approval-lines="exchangeApprovalLines"
        :draft-kind="DRAFT_KIND.EXCHANGE"
        :draft-code="exchangeCode"
        @complete-approval="onCompleteApproval"
      /> -->

      <DynamicDialog />

      <!-- <PrintExchangePdfPreviewModal v-model:show="showPrintPdf" :exchange-detail="exchangeDetail" /> -->
    </template>
  </div>
</template>

<script setup>
import { useToast } from 'primevue';
import { computed, defineAsyncComponent, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import DraftApprovalHistoryTable from '@/components/headQuarter/DraftApprovalHistoryTable.vue';
import DraftApprovalLine from '@/components/headQuarter/DraftApprovalLine.vue';
import ExchangeOtherDetailTable from '@/components/headQuarter/ExchangeOtherDetailTable.vue';
import { useAppConfirmModal } from '@/hooks/useAppConfirmModal';
import { useModal } from '@/hooks/useModal';
import { useUserStore } from '@/stores/user';
import HQExchangeApi from '@/utils/api/HQExchangeApi';
import { DRAFT_KIND, EXCHANGE_STATUS } from '@/utils/constant';
import { formatKoExchangeOtherStatus } from '@/utils/format';
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

const exchangeOtherDetail = ref(null);
const exchangeApprovalLines = ref([]);
const disabledCancelButton = computed(() => {
  // PENDING 상태일 때만 결재취소(기안자가) 가능하므로
  // PENDING 상태가 아니면 결재취소 버튼 disabled
  return exchangeOtherDetail.value.status !== EXCHANGE_STATUS.PENDING;
});

const isRequested = computed(() => {
  return exchangeOtherDetail.value.status === EXCHANGE_STATUS.REQUESTED;
});

const isCompleted = computed(() => {
  return exchangeOtherDetail.value.status === EXCHANGE_STATUS.SHIPPED;
});

const hqExchangeApi = new HQExchangeApi();
const { exchangeStockHistoryCode } = route.params;

const showPrintPdf = ref(false);

const getExchangeOtherDetailPageData = () => {
  hqExchangeApi.getExchangeOtherDetail(exchangeStockHistoryCode).then(data => {
    exchangeOtherDetail.value = data;
  });
};

// const handleRequestApproval = (approverCode, comment) => {
//   hqExchangeApi.requestApproval({ exchangeCode, superManagerMemberCode: approverCode, comment }).then(() => {
//     toast.add({
//       severity: 'success',
//       summary: '처리 성공',
//       detail: '교환에 대한 결재요청이 등록되었습니다.',
//       life: 3000,
//     });

//     // page reload
//     getExchangeDetailPageData();
//   });
// };
// const clickRequestApproval = () => {
//   openModal({
//     component: ApprovalRequestModalBody,
//     header: '결재요청',
//     data: {
//       draftKind: DRAFT_KIND.EXCHANGE,
//     },
//     onClose: opt => {
//       const callbackParams = opt.data;
//       if (!callbackParams) return;

//       const { approverCode, comment } = callbackParams;

//       handleRequestApproval(approverCode, comment);
//     },
//   });
// };

// const clickPrintExchange = () => {
//   // TODO:: 교환요청서 출력
//   showPrintPdf.value = true;
// };

// const clickPrintInvoice = () => {
//   // TODO:: 거래명세서 출력
//   showPrintPdf.value = true;
// };

const clickGoToList = () => {
  router.replace({ name: 'hq:order:exchange:other-list' });
};

const cancelExchange = () => {
  hqExchangeApi.cancelApproval(exchangeCode).then(() => {
    toast.add({ severity: 'error', summary: '처리 성공', detail: '결재 요청이 취소되었습니다.', life: 3000 });

    // page reload
    getExchangeOtherDetailPageData();
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
  getExchangeOtherDetailPageData();
};

onMounted(() => {
  // 교환 상세 데이터 셋팅
  getExchangeOtherDetailPageData();
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
