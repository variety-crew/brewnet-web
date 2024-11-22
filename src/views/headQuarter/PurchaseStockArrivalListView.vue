<template>
  <div class="purchase-stock-arrival-list-container">
    <SearchArea grid @form-reset="onReset" @search="onSearch">
      <AppDateRangePicker
        v-model:start="criteria.startDate"
        v-model:end="criteria.endDate"
        label="발주일자"
        class="criteria date"
        label-position="left"
      />
      <AppSelect
        v-model="criteria.criteria"
        :options="criteriaOptions"
        :initial-value="initialCriteria"
        label="검색어"
        label-position="left"
        full-width
      />
      <AppInputText v-model="criteria.keyword" placeholder="검색어 입력" class="criteria keyword" />
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
import { computed, onMounted, ref } from 'vue';

import AppTable from '@/components/common/AppTable.vue';
import AppDateRangePicker from '@/components/common/form/AppDateRangePicker.vue';
import AppInputText from '@/components/common/form/AppInputText.vue';
import AppSelect from '@/components/common/form/AppSelect.vue';
import SearchArea from '@/components/common/SearchArea.vue';
import HQPurchaseApi from '@/utils/api/HQPurchaseApi';
import { CRITERIA_IN_STOCK, SEARCH_CRITERIA } from '@/utils/constant';
import { formatKoSearchCriteria } from '@/utils/format';
import { makeSelectOption } from '@/utils/helper';

const getInitialCriteria = () => ({
  startDate: dayjs().subtract(1, 'year').toDate(),
  endDate: new Date(),
  criteria: '',
  keyword: '',
});
const criteria = ref(getInitialCriteria());
const paginatedItems = ref([]);
const totalElements = ref(0);
const pageSize = ref(15);
const page = ref(1);

const initialCriteria = ref('');
const criteriaOptions = computed(() => {
  return CRITERIA_IN_STOCK.map(e => makeSelectOption(formatKoSearchCriteria(e), e));
});

const hqPurchaseApi = new HQPurchaseApi();

function handleStockIn(data) {}

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
  {
    field: '',
    header: '입고처리',
    template: {
      button: [
        {
          getLabel: data => '입고',
          clickHandler: handleStockIn,
        },
      ],
    },
  },
];

const getInStockItems = () => {
  const currentCriteria = criteria.value.criteria;
  const queryKeyword = criteria.value.keyword;

  hqPurchaseApi
    .getInStockItems({
      page: page.value,
      pageSize: pageSize.value,
      startDate: criteria.value.startDate,
      endDate: criteria.value.endDate,
      // 현재 선택된 검색기준을 확인하여 query params 설정
      itemUniqueCode: currentCriteria === SEARCH_CRITERIA.ITEM_UNIQUE_CODE ? queryKeyword : undefined,
      itemName: currentCriteria === SEARCH_CRITERIA.ITEM_NAME ? queryKeyword : undefined,
      correspondentName: currentCriteria === SEARCH_CRITERIA.CORRESPONDENT_NAME ? queryKeyword : undefined,
      storageName: currentCriteria === SEARCH_CRITERIA.STORAGE_NAME ? queryKeyword : undefined,
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
  // default 검색기준 셋팅
  initialCriteria.value = SEARCH_CRITERIA.ITEM_UNIQUE_CODE;
  criteria.value.criteria = SEARCH_CRITERIA.ITEM_UNIQUE_CODE;

  getInStockItems();
});
</script>

<style scoped>
.purchase-stock-arrival-list-container {
  .criteria.date {
    grid-column: 1 / 7;
  }

  .criteria.keyword {
    grid-column: 2 / 4;
  }
}
</style>
