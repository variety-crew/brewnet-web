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
          <Button label="교환완료" variant="outlined" size="small" @click="clickCompleteExchange" />
          <Button label="교환보기" variant="outlined" size="small" @click="clickGoToExchange" />
          <Button label="처리내역출력" variant="outlined" size="small" @click="clickPrintExchange" />
          <Button label="목록으로" size="small" severity="secondary" variant="outlined" @click="clickGoToList" />
        </div>
      </div>

      <div class="body-area">
        <h1>교환처리내역</h1>
        <div style="margin-bottom: 2%"></div>

        <ExchangeOtherDetailTable v-if="exchangeOtherDetail" :exchange-other-detail="exchangeOtherDetail" />
      </div>
      <!-- <PrintExchangePdfPreviewModal v-model:show="showPrintPdf" :exchange-detail="exchangeDetail" /> -->
    </template>
  </div>
</template>

<script setup>
import { useToast } from 'primevue';
import { computed, defineAsyncComponent, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import ExchangeOtherDetailTable from '@/components/headQuarter/ExchangeOtherDetailTable.vue';
import { useAppConfirmModal } from '@/hooks/useAppConfirmModal';
import { useModal } from '@/hooks/useModal';
import { useUserStore } from '@/stores/user';
import HQExchangeApi from '@/utils/api/HQExchangeApi';
import { EXCHANGE_STATUS } from '@/utils/constant';
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

const hqExchangeApi = new HQExchangeApi();
const { exchangeStockHistoryCode } = route.params;

const showPrintPdf = ref(false);

const getExchangeOtherDetailPageData = () => {
  hqExchangeApi.getExchangeOtherDetail(exchangeStockHistoryCode).then(data => {
    exchangeOtherDetail.value = data;
  });
};

const clickCompleteExchange = () => {
  // TODO: 교환완료
  showPrintPdf.value = true;
};

const clickGoToExchange = () => {
  // TODO: 교환 상세조회 페이지로 이동
  showPrintPdf.value = true;
};
const clickPrintExchange = () => {
  // TODO: 처리내역출력
  showPrintPdf.value = true;
};

const clickGoToList = () => {
  router.replace({ name: 'hq:order:exchange:other-list' });
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
