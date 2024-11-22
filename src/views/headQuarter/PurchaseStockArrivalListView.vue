<template>
  <div class="purchase-stock-arrival-list-container">
    <SearchArea grid @form-reset="onReset" @search="onSearch">
      <AppDateRangePicker
        v-model:start="criteria.startDate"
        v-model:end="criteria.endDate"
        label="발주일자"
        class="criteria date"
      />
      <AppInputText v-model="criteria.itemUniqueCode" label="품목코드" />
      <AppInputText v-model="criteria.itemName" label="품목명" />
      <AppInputText v-model="criteria.correspondentName" label="거래처명" />
      <AppInputText v-model="criteria.storageName" label="창고명" />
    </SearchArea>

    <AppTable
      :columns="columns"
      :rows-per-page="pageSize"
      :paginated-data="paginatedItems"
      :total-elements="totalElements"
      @reload="onReload"
    />
  </div>
</template>

<script setup>
import dayjs from 'dayjs';
import { onMounted, ref } from 'vue';

import AppTable from '@/components/common/AppTable.vue';
import AppDateRangePicker from '@/components/common/form/AppDateRangePicker.vue';
import AppInputText from '@/components/common/form/AppInputText.vue';
import SearchArea from '@/components/common/SearchArea.vue';
import HQPurchaseApi from '@/utils/api/HQPurchaseApi';

const getInitialCriteria = () => ({
  startDate: dayjs().subtract(1, 'year').toDate(),
  endDate: new Date(),
  itemUniqueCode: '',
  itemName: '',
  correspondentName: '',
  storageName: '',
});
const criteria = ref(getInitialCriteria());
const paginatedItems = ref([]);
const totalElements = ref(0);
const pageSize = ref(15);
const page = ref(1);

const hqPurchaseApi = new HQPurchaseApi();

const columns = [
  {
    field: 'purchaseCode',
    header: '발주코드',
  },
  {
    field: 'itemUniqueCode',
    header: '품목코드',
  },
  {
    field: 'itemName',
    header: '품목명',
  },
  { field: 'quantity', header: '입고수량' },
  { field: 'storageName', header: '입고창고' },
  { field: 'correspondentName', header: '거래처' },
  { field: 'createdAt', header: '발주일자' },
];

const getInStockItems = () => {
  hqPurchaseApi
    .getInStockItems({
      page: page.value,
      pageSize: pageSize.value,
      startDate: criteria.value.startDate,
      endDate: criteria.value.endDate,
      itemUniqueCode: criteria.value.itemUniqueCode,
      itemName: criteria.value.itemName,
      correspondentName: criteria.value.correspondentName,
      storageName: criteria.value.storageName,
    })
    .then(data => {
      paginatedItems.value = data.data;
      totalElements.value = data.totalCount;
    });
};

const onSearch = () => {
  getInStockItems();
};

const onReset = () => {
  criteria.value = getInitialCriteria();
  getInStockItems();
};

const onReload = () => {
  getInStockItems();
};

onMounted(() => {
  getInStockItems();
});
</script>

<style scoped>
.purchase-stock-arrival-list-container {
  .criteria.date {
    grid-column: 1 / 7;
  }
}
</style>
