<template>
  <div>
    <SearchArea grid @reset="onReset" @search="onSearch">
      <AppSelect
        v-model="criteria.criteria"
        :options="criteriaOptions"
        :initial-value="criteria.criteria"
        label="검색어"
        label-position="left"
        full-width
      />
      <AppInputText v-model="criteria.keyword" placeholder="검색어 입력" class="criteria keyword" />
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
import HQItemApi from '@/utils/api/HQItemApi';
import { CRITERIA_ITEM_LIST, SEARCH_CRITERIA } from '@/utils/constant';
import { formatKoSearchCriteria } from '@/utils/format';
import { makeSelectOption } from '@/utils/helper';

const page = ref(0);
const pageSize = ref(15);
const paginatedItems = ref([]);
const totalElements = ref(0);

const getInitialCriteria = () => ({
  criteria: SEARCH_CRITERIA.ITEM_NAME,
  keyword: '',
});
const criteria = ref(getInitialCriteria());
const criteriaOptions = computed(() => {
  return CRITERIA_ITEM_LIST.map(e => makeSelectOption(formatKoSearchCriteria(e), e));
});

const hpItemApi = new HQItemApi();

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
  { field: 'correspondentName', header: '취급거래처' },
  { field: 'safetyStock', header: '안전재고값', render: data => data.safetyStock.toLocaleString() },
  {
    field: 'imageUrl',
    header: '상품이미지',
    template: {
      image: {
        getSrc: data => data.imageUrl || undefined,
      },
    },
  },
  {
    field: 'active',
    header: '상태',
    render: data => {
      if (data.active) return '활성';
      return '비활성';
    },
    template: {
      tag: {
        getSeverity: data => (data.active ? undefined : 'secondary'),
      },
    },
  },
];

const getItems = () => {
  hpItemApi
    .getItems({
      page: page.value,
      pageSize: pageSize.value,
      itemName: criteria.value.criteria === SEARCH_CRITERIA.ITEM_NAME ? criteria.value.keyword : undefined,
      itemUniqueCode: criteria.value.criteria === SEARCH_CRITERIA.ITEM_UNIQUE_CODE ? criteria.value.keyword : undefined,
    })
    .then(data => {
      paginatedItems.value = data.content;
      totalElements.value = data.totalElements;
    });
};

const onSearch = () => {
  getItems();
};

const onReset = () => {
  criteria.value = getInitialCriteria();
  page.value = 0;
  getItems();
};

const onReload = () => {
  getItems();
};

const onChangePage = event => {
  page.value = event.page;
  getItems();
};

onMounted(() => {
  getItems();
});
</script>

<style scoped></style>
