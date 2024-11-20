<template>
  <div class="purchase-form-container">
    <AppAutoComplete
      v-model="selectedSupplier"
      label="거래처 선택"
      :suggestions="supplierSuggestions"
      placeholder="거래처명이나 거래처코드로 검색"
      full-width
      class="mb-4"
      @complete-input="onCompleteInput"
    />

    <AppTableStyled full-width>
      <thead>
        <tr>
          <th>
            <CheckBox v-model="allCheck" binary />
          </th>
          <th v-for="header in tableHeader" :key="header">{{ header }}</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="selectedSupplier">
          <tr v-for="item in items" :key="item.code">
            <td class="align-center">
              <Checkbox v-model="checkedItems" name="itemByPurchase" :value="item.code" />
            </td>
            <td class="align-center">{{ item.uniqueCode }}</td>
            <td>{{ item.name }}</td>
            <td>
              <AppInputText
                v-model="item.quantity"
                :disabled="!checkedItems.includes(item.code)"
                :placeholder="checkedItems.includes(item.code) ? undefined : '발주를 원하시면 체크 선택을 해주세요.'"
                number-mode
                :text-align="checkedItems.includes(item.code) ? 'right' : 'center'"
              />
            </td>
            <td class="align-right">{{ item.purchasePrice.toLocaleString() }}</td>
            <td class="align-right">{{ calculateSum(item.purchasePrice, item.quantity).toLocaleString() }}</td>
            <td class="align-right">
              {{ calculateTax(calculateSum(item.purchasePrice, item.quantity)).toLocaleString() }}
            </td>
          </tr>
        </template>
        <template v-else>
          <tr>
            <td colspan="7" class="empty-td">거래처를 선택해주세요.</td>
          </tr>
        </template>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="5">총 합계 {{ total.toLocaleString() }}</td>
          <td class="align-right">{{ totalSupplyValue.toLocaleString() }}</td>
          <td class="align-right">{{ totalTaxValue.toLocaleString() }}</td>
        </tr>
      </tfoot>
    </AppTableStyled>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue';

import AppTableStyled from '@/components/common/AppTableStyled.vue';
import AppAutoComplete from '@/components/common/form/AppAutoComplete.vue';
import AppInputText from '@/components/common/form/AppInputText.vue';
import { makeAutocompleteSuggestion } from '@/utils/helper';
import { mockupItems, mockupSuppliers } from '@/utils/mockup';

const selectedSupplier = ref(null);
const filteredSuppliers = ref([]);
const supplierSuggestions = computed(() => {
  return filteredSuppliers.value.map(e => makeAutocompleteSuggestion(e.code, `#${e.code} ${e.name}`));
});
const allCheck = ref(false);
const tableHeader = ref(['품목코드', '품목명', '수량', '단가', '공급가액', '부가세']);
const items = ref([]);
const checkedItems = ref([]); // 체크박스 선택된 상품(코드)들
const totalSupplyValue = ref(0);
const totalTaxValue = ref(0);
const total = computed(() => totalSupplyValue.value + totalTaxValue.value);

const onCompleteInput = event => {
  // if (!event.query) return;
  // filteredSuppliers.value = mockupSuppliers.filter(
  //   e => e.code.toString().includes(event.query) || e.name.includes(event.query),
  // );

  filteredSuppliers.value = [...mockupSuppliers];
};

const calculateSum = (price, quantity) => {
  if (!price || !quantity) return 0;
  return price * quantity;
};

const calculateTax = sum => {
  return sum * 0.1;
};

// 선택된 거래처가 변경된 경우, 아이템 목록 셋팅
watch(selectedSupplier, newVal => {
  if (!newVal) return;
  items.value = mockupItems.map(e => ({ ...e, quantity: null }));
});

// items가 변하면(items 안의 quantity가 변하면면) 총합 계산
watch(
  items,
  newItems => {
    // 공급가액 총액 계산
    totalSupplyValue.value = newItems
      .map(e => calculateSum(e.purchasePrice, e.quantity))
      .reduce((prev, current) => prev + current, 0);

    // 부가세 총액 계산
    totalTaxValue.value = newItems
      .map(e => calculateTax(calculateSum(e.purchasePrice, e.quantity)))
      .reduce((prev, current) => prev + current, 0);
  },
  { deep: true }, // items 내용이 변하면 watch 되도록 설정
);

// allCheck가 변하면 item 체크박스 조정
watch(allCheck, newAllCheck => {
  if (newAllCheck) {
    checkedItems.value = items.value.map(e => e.code);
  } else {
    checkedItems.value = [];
  }
});

// item의 check 상태가 변하면 입력한 수량 조정
watch(checkedItems, newCheckedItems => {
  const clearTargetItems = items.value.map(e => ({
    ...e,
    quantity: newCheckedItems.includes(e.code) ? e.quantity : null,
  }));
  items.value = clearTargetItems;
});
</script>

<style scoped>
.purchase-form-container {
  .empty-td {
    text-align: center;
  }

  td.align-right {
    text-align: right;
  }

  td.align-center {
    text-align: center;
  }
}
</style>
