<template>
  <div>
    <SearchArea grid @reset="onReset" @search="onSearch">
      <AppSelect v-model="selectedStorage" :options="storageOptions" label="창고명" label-position="left" full-width />
      <AppInputText v-model="criteria.keyword" placeholder="품목명으로 검색" class="criteria keyword" />
    </SearchArea>

    <AppTable
      :columns="columns"
      :paginated-data="paginatedItems"
      :rows-per-page="pageSize"
      :total-elements="totalElements"
      @reload="onReload"
      @change-page="onChangePage"
    />
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';

import AppTable from '@/components/common/AppTable.vue';
import AppInputText from '@/components/common/form/AppInputText.vue';
import AppSelect from '@/components/common/form/AppSelect.vue';
import SearchArea from '@/components/common/SearchArea.vue';
import HQStorageApi from '@/utils/api/HQStorageApi';
import { SEARCH_CRITERIA } from '@/utils/constant';

const page = ref(1);
const pageSize = ref(15);
const paginatedItems = ref([]);
const totalElements = ref(0);

const hqStorageApi = new HQStorageApi();

const initialStorage = ref({ storageCode: 1, storageName: '' });
const selectedStorage = ref(1);
const storageOptions = ref([]);

const getInitialCriteria = () => ({
  criteria: SEARCH_CRITERIA.ITEM_NAME,
  keyword: '',
});
const criteria = ref(getInitialCriteria());

const columns = [
  { field: 'itemUniqueCode', header: '품목코드', sortable: true },
  { field: 'itemName', header: '품목명', sortable: true },
  {
    field: 'availableStock',
    header: '가용재고',
    render: data => data.availableStock.toLocaleString(),
    alignment: 'right',
  },
  { field: 'inStock', header: '입고예정재고', render: data => data.inStock.toLocaleString(), alignment: 'right' },
  {
    field: 'safetyStock',
    header: '안전재고값',
    render: data => data.safetyStock.toLocaleString(),
    alignment: 'right',
  },
  {
    field: 'outStock',
    header: '출고예정재고',
    render: data => data.outStock.toLocaleString(),
    alignment: 'right',
  },
  {
    field: 'currentStock',
    header: '현재재고',
    render: data => data.currentStock.toLocaleString(),
    alignment: 'right',
  },
];

const getStorageList = () => {
  hqStorageApi.getStoraeNames().then(data => {
    storageOptions.value = data.map(storage => ({
      label: storage.storageName,
      value: storage.storageCode,
    }));

    if (storageOptions.value.length > 0) {
      initialStorage.value = storageOptions.value[0];
      selectedStorage.value = initialStorage.value.storageCode;
      getStockList();
    }
  });
};

const getStockList = () => {
  hqStorageApi
    .getStock({
      page: page.value,
      pageSize: pageSize.value,
      storageCode: selectedStorage.value,
      itemName: criteria.value.keyword,
    })
    .then(data => {
      paginatedItems.value = data.data;
      totalElements.value = data.totalCount;
    });
};

const onSearch = () => {
  getStockList();
};

const onReset = () => {
  criteria.value = getInitialCriteria();
  getStockList();
};

const onReload = () => {
  getStockList();
};

const onChangePage = event => {
  page.value = event.page + 1;
  getStockList();
};

onMounted(() => {
  getStorageList();
});
</script>

<style scoped></style>
