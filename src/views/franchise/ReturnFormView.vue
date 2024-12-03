<template>
  <div class="return-form-container">
    <AppAutoComplete
      v-model="selectedOrder"
      :suggestions="orderSuggestions"
      placeholder="주문코드로 검색"
      label="반품 신청할 주문을 선택해주세요."
      @complete-input="onCompleteInputOrderCode"
    />

    <AppTableStyled>
      <thead>
        <tr>
          <th>
            <Checkbox v-model="allCheck" binary size="small" />
          </th>
          <th>품목코드</th>
          <th>품목명</th>
          <th>수량</th>
          <th>단가</th>
          <th>주문금액</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="availableOrderItems.length > 0 && checkedOrderItems">
          <tr v-for="orderItem in availableOrderItems" :key="orderItem.itemCode">
            <td>
              <Checkbox v-model="checkedOrderItems" name="availableOrderItems" :value="orderItem.itemCode" />
            </td>
            <td class="align-center">{{ orderItem.itemUniqueCode }}</td>
            <td class="align-center">{{ orderItem.itemName }}</td>
            <td class="align-center">{{ orderItem.quantity.toLocaleString() }}</td>
            <td class="align-right">{{ orderItem.sellingPrice.toLocaleString() }}</td>
            <td class="align-right">{{ orderItem.partSumPrice.toLocaleString() }}</td>
          </tr>
        </template>
        <tr v-else>
          <td colspan="6">반품가능한 품목이 없습니다.</td>
        </tr>
      </tbody>
    </AppTableStyled>

    <AppRadioList
      v-model="reason"
      name="return-reason"
      label="반품사유"
      :options="reasonOptions"
      label-position="left"
    />

    <Textarea v-model="explanation" rows="10" cols="100" placeholder="반품 사유를 입력해주세요." size="small" />

    {{ checkedOrderItems }}
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue';

import AppTableStyled from '@/components/common/AppTableStyled.vue';
import AppAutoComplete from '@/components/common/form/AppAutoComplete.vue';
import AppCheck from '@/components/common/form/AppCheck.vue';
import AppRadioList from '@/components/common/form/AppRadioList.vue';
import FCReturnApi from '@/utils/api/FCReturnApi';
import { RETURN_REASON_LIST } from '@/utils/constant';
import { formatKoReturnReason } from '@/utils/format';
import { makeAutocompleteSuggestion, makeRadioOption } from '@/utils/helper';

const selectedOrder = ref(null);
const availableOrderItems = ref([]);
const returnAvailableOrderList = ref([]);
const orderSuggestions = computed(() => {
  return returnAvailableOrderList.value.map(e => makeAutocompleteSuggestion(e, e));
});
const reason = ref('');
const reasonOptions = computed(() => {
  return RETURN_REASON_LIST.map(e => makeRadioOption(formatKoReturnReason(e), e, e));
});
const explanation = ref('');

const allCheck = ref(false);
const checkedOrderItems = ref(null);

const fcReturnApi = new FCReturnApi();

const onCompleteInputOrderCode = event => {
  // 반품가능한 주문목록 검색
  fcReturnApi.getAvailableReturnList().then(data => {
    returnAvailableOrderList.value = data;
  });
};

watch(selectedOrder, newSelectedOrder => {
  if (newSelectedOrder && newSelectedOrder.code) {
    const newSelectedOrderCode = newSelectedOrder.code;

    // 반품 가능한 품목 조회
    fcReturnApi.getAvailableOrderItemsList(newSelectedOrderCode).then(data => {
      availableOrderItems.value = data;
      // 초기 체크상태 설정
      // checkedOrderItems.value = data.reduce((acc, current) => {
      //   acc[current.itemCode] = true;
      //   return acc;
      // }, {});
    });
  }
});

watch(allCheck, newAllCheck => {
  // if (newAllCheck) {
  //   // 전체 체크상태로 변경
  //   checkedOrderItems.value = availableOrderItems.value.reduce((acc, current) => {
  //     acc[current.itemCode] = true;
  //     return acc;
  //   }, {});
  // } else {
  //   // 전체 체크 해제
  //   checkedOrderItems.value = availableOrderItems.value.reduce((acc, current) => {
  //     acc[current.itemCode] = false;
  //     return acc;
  //   }, {});
  // }
});
</script>

<style scoped>
.return-form-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
