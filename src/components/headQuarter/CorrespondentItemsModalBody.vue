<template>
  <AppModalBody>
    <SearchArea grid @search="onSearch" @form-reset="onReset">
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
  </AppModalBody>
</template>

<script setup>
import { computed, inject, onMounted, ref } from 'vue';

import HQCorrespondentApi from '@/utils/api/HQCorrespondentApi';
import { CRITERIA_CORRESPONDENT_ITEM_LIST, SEARCH_CRITERIA } from '@/utils/constant';
import { formatKoSearchCriteria } from '@/utils/format';
import { makeSelectOption } from '@/utils/helper';

import AppModalBody from '../common/AppModalBody.vue';

const dialogRef = inject('dialogRef');
const currentCorrespondentCode = ref(null);

const page = ref(1);
const pageSize = ref(15);
const paginatedItems = ref([]);
const totalElements = ref(0);

const getInitialCriteria = () => ({
  criteria: SEARCH_CRITERIA.ITEM_UNIQUE_CODE,
  keyword: '',
});
const criteria = ref(getInitialCriteria());
const criteriaOptions = computed(() => {
  return CRITERIA_CORRESPONDENT_ITEM_LIST.map(e => makeSelectOption(formatKoSearchCriteria(e), e));
});

const hqCorrespondentApi = new HQCorrespondentApi();

const columns = [
  {
    field: 'categoryName',
    header: '카테고리',
  },
  {
    field: 'itemUniqueCode',
    header: '품목코드',
  },
  {
    field: 'itemName',
    header: '품목명',
  },
  {
    field: 'sellingPrice',
    header: '판매단가',
    render: data => data.sellingPrice.toLocaleString(),
    alignment: 'right',
  },
  {
    field: 'purchasePrice',
    header: '구매단가',
    render: data => data.purchasePrice.toLocaleString(),
    alignment: 'right',
  },
  {
    field: 'safetyStock',
    header: '안전재고값',
    render: data => data.safetyStock.toLocaleString(),
    alignment: 'right',
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

const getCorrespondentItems = () => {
  hqCorrespondentApi
    .getCorrespondentItems({
      page: page.value,
      pageSize: pageSize.value,
      correspondentCode: currentCorrespondentCode.value,
      itemUniqueCode: criteria.value.criteria === SEARCH_CRITERIA.ITEM_UNIQUE_CODE ? criteria.value.keyword : undefined,
      itemName: criteria.value.criteria === SEARCH_CRITERIA.ITEM_NAME ? criteria.value.keyword : undefined,
    })
    .then(data => {
      paginatedItems.value = data.data;
      totalElements.value = data.totalCount;
    });
};

const onSearch = () => {
  getCorrespondentItems();
};

const onReset = () => {
  criteria.value = getInitialCriteria();
  page.value = 1;
  getCorrespondentItems();
};

const onReload = () => {
  getCorrespondentItems();
};

const onChangePage = event => {
  page.value = event.page;
  getCorrespondentItems();
};

onMounted(() => {
  const { correspondentCode } = dialogRef.value.data;
  currentCorrespondentCode.value = correspondentCode;

  getCorrespondentItems();
});
</script>

<style scoped></style>
