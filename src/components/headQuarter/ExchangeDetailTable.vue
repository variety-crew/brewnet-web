<template>
  <AppTableStyled full-width>
    <tbody>
      <tr>
        <th>교환요청일자</th>
        <td>{{ exchangeDetail.createdAt }}</td>
        <th>교환요청지점</th>
        <td>{{ exchangeDetail.franchiseName }}</td>
        <th>교환사유</th>
        <td>{{ exchangeDetail.reason }}</td>
        <th>교환담당자</th>
        <td>{{ exchangeDetail.memberName }}</td>
      </tr>
      <tr>
        <th>교환 상세 사유</th>
        <td colspan="7">{{ exchangeDetail.explanation }}</td>
      </tr>
      <tr>
        <th>비고사항</th>
        <td colspan="7">{{ exchangeDetail.comment }}</td>
      </tr>
      <tr>
        <th>품목코드</th>
        <th colspan="3">품목명</th>
        <th colspan="2">카테고리</th>
        <th colspan="2">수량</th>
      </tr>
      <tr v-for="item in exchangeDetail.exchangeItemList" :key="item.itemUniqueCode">
        <td class="align-center">{{ item.itemUniqueCode }}</td>
        <td colspan="3">{{ item.itemName }}</td>
        <td colspan="2">{{ item.superCategory + ' > ' + item.subCategory }}</td>
        <td colspan="2" class="align-right">{{ item.quantity.toLocaleString() }}</td>
      </tr>
      <tr>
        <th colspan="1">이미지</th>
        <td colspan="8">
          <div v-for="(image, index) in exchangeDetail.exchangeImageList" :key="index">
            <Image :src="image" alt="교환 상품 이미지" width="200" preview />
          </div>
        </td>
      </tr>
    </tbody>
  </AppTableStyled>
</template>

<script setup>
import { computed } from 'vue';

import AppTableStyled from '../common/AppTableStyled.vue';

const { exchangeDetail } = defineProps({
  exchangeDetail: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped></style>
