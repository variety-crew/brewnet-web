<template>
  <div class="correspondent-list-container">
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
      :paginated-data="paginatedCorrespondents"
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
import CorrespondentApi from '@/utils/api/CorrespondentApi';
import { CRITERIA_CORRESPONDENT_LIST, SEARCH_CRITERIA } from '@/utils/constant';
import { formatKoSearchCriteria } from '@/utils/format';
import { makeSelectOption } from '@/utils/helper';

const page = ref(1);
const pageSize = ref(15);
const paginatedCorrespondents = ref([]);
const totalElements = ref(0);

const getInitialCriteria = () => ({
  criteria: SEARCH_CRITERIA.CORRESPONDENT_NAME,
  keyword: '',
});
const criteria = ref(getInitialCriteria());
const criteriaOptions = computed(() => {
  return CRITERIA_CORRESPONDENT_LIST.map(e => makeSelectOption(formatKoSearchCriteria(e), e));
});

const correspondentApi = new CorrespondentApi();

const columns = [
  {
    field: 'correspondentCode',
    header: '거래처코드',
  },
  {
    field: 'correspondentName',
    header: '거래처명',
  },
  {
    field: 'managerName',
    header: '담당자명',
  },
  {
    field: 'address',
    header: '주소',
  },
  {
    field: 'contact',
    header: '연락처',
  },
  {
    field: 'email',
    header: '이메일',
  },
  {
    field: '',
    header: '',
    template: {
      button: [
        {
          getLabel: () => '정보수정',
        },
        {
          getLabel: () => '품목조회',
        },
        {
          getLabel: () => '삭제',
        },
      ],
    },
  },
];

const getCorrespondents = () => {
  correspondentApi
    .getCorrespondents({
      page: page.value,
      pageSize: pageSize.value,
      searchType: criteria.value.criteria,
      keyword: criteria.value.keyword,
    })
    .then(data => {
      paginatedCorrespondents.value = data.data.map(e => ({ ...e, address: `${e.address} ${e.detailAddress}` })); // address는 하나로 표시하기 위해
      totalElements.value = data.totalCount;
    });
};

const onSearch = () => {
  getCorrespondents();
};

const onReset = () => {
  criteria.value = getInitialCriteria();
  page.value = 1;
  getCorrespondents();
};

const onReload = () => {
  getCorrespondents();
};

const onChangePage = event => {
  page.value = event.page;
  getCorrespondents();
};

onMounted(() => {
  getCorrespondents();
});
</script>

<style scoped>
.correspondent-list-container {
  .criteria.keyword {
    grid-column: 2 / 4;
  }
}
</style>
