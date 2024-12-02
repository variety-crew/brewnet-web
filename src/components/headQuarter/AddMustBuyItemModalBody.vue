<template>
  <AppModalBody action-button-label="저장" @click-action-button="clickSave">
    <div class="content">
      <AppTable
        :columns="columns"
        :paginated-data="paginatedItems"
        :rows-per-page="pageSize"
        :total-elements="totalElements"
        @reload="onReload"
      />

      <div class="right">
        <AppLabelText label="상품" :text="selectedItem ? selectedItem.name : '상품을 선택해주세요.'" />
        <AppInputNumber v-model="quantity" label="최소 구매 수량" />
        <AppDatePicker v-model:date="dueDate" label="마감 기한" />
      </div>
    </div>
  </AppModalBody>
</template>

<script setup>
import { useToast } from 'primevue';
import { inject, onMounted, ref } from 'vue';

import HQItemApi from '@/utils/api/HQItemApi';
import HQItemMustBuyApi from '@/utils/api/HQItemMustBuyApi';

import AppLabelText from '../common/AppLabelText.vue';
import AppModalBody from '../common/AppModalBody.vue';
import AppTable from '../common/AppTable.vue';
import AppDatePicker from '../common/form/AppDatePicker.vue';
import AppInputNumber from '../common/form/AppInputNumber.vue';

const toast = useToast();

const dialogRef = inject('dialogRef');

const quantity = ref(null);
const dueDate = ref(null);

const page = ref(0);
const pageSize = ref(15);
const paginatedItems = ref([]);
const totalElements = ref(0);
const itemName = ref('');
const itemUniqueCode = ref('');
const selectedItem = ref(null);

const hqItemMustBuyApi = new HQItemMustBuyApi();
const hqItemApi = new HQItemApi();

const getItems = () => {
  hqItemApi
    .getItems({
      page: page.value,
      pageSize: pageSize.value,
      itemName: itemName.value,
      itemUniqueCode: itemUniqueCode.value,
    })
    .then(data => {
      paginatedItems.value = data.content;
      totalElements.value = data.totalElements;
    });
};

const columns = [
  { field: 'categoryName', header: '카테고리' },
  { field: 'itemUniqueCode', header: '품목코드' },
  { field: 'name', header: '품목명' },
  { field: 'sellingPrice', header: '판매단가', render: data => data.sellingPrice.toLocaleString(), alignment: 'right' },
  {
    field: 'purchasePrice',
    header: '구매단가',
    render: data => data.purchasePrice.toLocaleString(),
    alignment: 'right',
  },
  {
    field: '',
    header: '',
    template: {
      button: [
        {
          getLabel: data => (selectedItem.value && selectedItem.value.itemCode === data.itemCode ? '선택해제' : '선택'),
          clickHandler: data => {
            if (selectedItem.value && selectedItem.value.itemCode === data.itemCode) {
              selectedItem.value = null;
            } else {
              selectedItem.value = data;
            }
          },
          getSeverity: data => {
            if (selectedItem.value && selectedItem.value.itemCode === data.itemCode) return 'danger';
            return undefined;
          },
        },
      ],
    },
  },
];

const clickSave = () => {
  try {
    if (!selectedItem.value) throw new Error('상품을 선택해주세요.');
    if (!quantity.value) throw new Error('최소 구매 수량을 입력해주세요.');
    if (!dueDate.value) throw new Error('마감 기한을 입력해주세요.');

    hqItemMustBuyApi
      .setMustBuy({
        itemCode: selectedItem.value.itemCode,
        quantity: quantity.value,
        dueDate: dueDate.value,
      })
      .then(() => {
        toast.add({ severity: 'success', summary: '처리 성공', detail: '필수구매품목이 등록되었습니다.', life: 3000 });

        // close
        dialogRef.value.close({ reload: true });
      });
  } catch (e) {
    toast.add({ severity: 'error', summary: '입력 확인', detail: e.message, life: 3000 });
  }
};

const onReload = () => {
  getItems();
};

onMounted(() => {
  getItems();
});
</script>

<style scoped>
.content {
  display: flex;
  gap: 20px;

  .right {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
}
</style>
