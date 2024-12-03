<template>
  <div class="exchange-detail-container">
    <template v-if="exchangeDetail">
      <div class="top-area">
        <Tag
          rounded
          :value="formatKoExchangeStatus(exchangeDetail.status)"
          :severity="getExchangeStatusSeverity(exchangeDetail.status)"
          class="mb-1"
        />
        <div class="top-buttons">
          <Button label="교환상태조회" variant="outlined" size="small" @click="checkStatus" />
          <Button
            label="취소"
            severity="danger"
            size="small"
            variant="outlined"
            :disabled="!isRequested"
            @click="clickCancel"
          />
          <Button label="목록으로" size="small" severity="secondary" variant="outlined" @click="clickGoToList" />
        </div>
      </div>

      <div class="body-area">
        <h1>교환상세</h1>
        <div style="margin-bottom: 2%"></div>

        <AppTableStyled full-width>
          <tbody>
            <tr>
              <th>주문번호</th>
              <td>{{ exchangeDetail.orderCode }}</td>
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
        </AppTableStyled>
      </div>
      <h4 class="mb-1">첨부파일</h4>
      <div class="image-gallery">
        <div v-for="(image, index) in exchangeDetail.exchangeImageList" :key="index" class="image-item">
          <Image :src="image" alt="교환 상품 이미지" width="200" preview />
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { useToast } from 'primevue';
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { useAppConfirmModal } from '@/hooks/useAppConfirmModal';
import FCExchangeApi from '@/utils/api/FCExchangeApi';
import { EXCHANGE_STATUS } from '@/utils/constant';
import { formatKoExchangeReason, formatKoExchangeStatus } from '@/utils/format';
import { getExchangeStatusSeverity } from '@/utils/helper';

const route = useRoute();
const router = useRouter();
const { showConfirm } = useAppConfirmModal();
const toast = useToast();

const totalPrice = ref(null);
const exchangeDetail = ref(null);

const isRequested = computed(() => {
  return exchangeDetail.value.status === EXCHANGE_STATUS.REQUESTED;
});

const fcExchangeApi = new FCExchangeApi();
const { exchangeCode } = route.params;

const getExchangeDetailPageData = () => {
  fcExchangeApi.getExchangeDetail(exchangeCode).then(data => {
    exchangeDetail.value = data;
    totalPrice.value = exchangeDetail.value.exchangeItemList.reduce((total, item) => {
      return total + item.quantity * item.sellingPrice;
    }, 0);
  });
};

const checkStatus = () => {
  fcExchangeApi.getExchangeStatus(exchangeCode).then(() => {});
};

const clickGoToList = () => {
  router.replace({ name: 'fc:home:exchange:list' });
};

const cancelExchange = () => {
  fcExchangeApi.cancelExchange(exchangeCode).then(() => {
    toast.add({ severity: 'error', summary: '처리 성공', detail: '교환 취소되었습니다.', life: 3000 });

    // 교환 목록 페이지로 이동
    clickGoToList();
  });
};

const clickCancel = () => {
  showConfirm({
    header: '교환 요청 취소',
    message: '교환 요청을 취소하시겠습니까?',
    acceptLabel: '교환 요청 취소',
    onAccept: cancelExchange,
    danger: true,
  });
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

  .image-gallery {
    display: flex;
    gap: 10px;
    /* flex-wrap: wrap; */
    float: left;
  }

  .image-item {
    /* flex: 0 0 auto; */
  }
}
</style>
