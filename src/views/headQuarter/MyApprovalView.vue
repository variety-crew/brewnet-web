<template>
  <div class="my-approval-container">
    <SearchArea grid @search="onSearch" @form-reset="onReset">
      <AppDateRangePicker
        v-model:start="criteria.startDate"
        v-model:end="criteria.endDate"
        label="기안일자"
        label-position="left"
        class="criteria date"
      />
      <AppRadioList
        v-model="criteria.approval"
        name="search-area-approval"
        :options="approvalOptions"
        label="결재상태"
        class="criteria radio"
        label-position="left"
      />
    </SearchArea>

    <AppTable
      v-model:sorting="sorting"
      :columns="columns"
      :rows-per-page="pageSize"
      :paginated-data="paginatedApprovals"
      :total-elements="totalElements"
      :sorting-options="sortingOptions"
      :initial-sorting="sorting"
      @reload="onReload"
      @change-page="onChangePage"
    />
  </div>
</template>

<script setup>
import dayjs from 'dayjs';
import { computed, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

import AppTable from '@/components/common/AppTable.vue';
import AppDateRangePicker from '@/components/common/form/AppDateRangePicker.vue';
import AppRadioList from '@/components/common/form/AppRadioList.vue';
import SearchArea from '@/components/common/SearchArea.vue';
import MemberApi from '@/utils/api/MemberApi';
import { APPROVAL_STATUS_LIST, DRAFT_KIND } from '@/utils/constant';
import { formatKoApprovalStatus, formatKoDraftKind } from '@/utils/format';
import { makeRadioOption, makeSelectOption } from '@/utils/helper';

const router = useRouter();

const APPROVAL_ALL = 'ALL';
const APPROVAL_OPTIONS = [APPROVAL_ALL].concat(APPROVAL_STATUS_LIST);

const SORTING_OPTION = {
  DATE_ASC: 'DATE_ASC',
  DATE_DESC: 'DATE_DESC',
};
const SORTING_OPTIONS = [SORTING_OPTION.DATE_ASC, SORTING_OPTION.DATE_DESC];
const formatKoSortingOption = opt => {
  if (opt === SORTING_OPTION.DATE_ASC) return '기안일 오래된 순';
  if (opt === SORTING_OPTION.DATE_DESC) return '기안일 최근 순';
  return '';
};

const getInitialCriteria = () => ({
  startDate: dayjs().subtract(1, 'year').toDate(),
  endDate: new Date(),
  approval: APPROVAL_ALL,
});
const criteria = ref(getInitialCriteria());
const sorting = ref(SORTING_OPTION.DATE_ASC);
const approvalOptions = computed(() => {
  return APPROVAL_OPTIONS.map(e => makeRadioOption(e === APPROVAL_ALL ? '전체' : formatKoApprovalStatus(e), e, e));
});
const sortingOptions = computed(() => {
  return SORTING_OPTIONS.map(e => makeSelectOption(formatKoSortingOption(e), e));
});
const page = ref(0);
const pageSize = ref(15);
const paginatedApprovals = ref([]);
const totalElements = ref(0);

const memberApi = new MemberApi();

const clickGoDetail = data => {
  // 기안 타입에 따라 상세보기 페이지 이동
  if (data.kind === DRAFT_KIND.ORDER) {
    // 주문 상세로 이동
  } else if (data.kind === DRAFT_KIND.EXCHANGE) {
    // 교환 상세로 이동
  } else if (data.kind === DRAFT_KIND.RETURN) {
    // 반품 상세로 이동
  } else if (data.kind === DRAFT_KIND.PURCHASE) {
    // 발주 상세로 이동
    router.push({ name: 'hq:purchase:detail', params: { purchaseCode: data.code } });
  }
};

const columns = [
  { field: 'kind', header: '구분', render: data => formatKoDraftKind(data.kind) },
  {
    field: 'code',
    header: '구분코드',
  },
  {
    field: 'title',
    header: '문서 제목',
  },
  { field: 'drafterName', header: '기안자' },
  { field: 'date', header: '기안일' },
  {
    field: 'status',
    header: '결재상태',
    render: data => formatKoApprovalStatus(data.status),
  },
  { field: 'approverName', header: '결재자' },
  {
    field: '',
    header: '기안서 보기',
    template: {
      button: [{ getLabel: () => '상세보기', clickHandler: clickGoDetail }],
    },
  },
];

const getMyApprovals = () => {
  memberApi
    .getMyApprovals({
      page: page.value,
      pageSize: pageSize.value,
      startDate: criteria.value.startDate,
      endDate: criteria.value.endDate,
      approval: criteria.value.approval === APPROVAL_ALL ? undefined : criteria.value.approval,
      dateSort: sorting.value === SORTING_OPTION.DATE_ASC ? 'ASC' : 'DESC',
    })
    .then(data => {
      paginatedApprovals.value = data.content;
      totalElements.value = data.totalElements;
    });
};

const onSearch = () => {
  getMyApprovals();
};

const onReset = () => {
  page.value = 0;
  criteria.value = getInitialCriteria();
  getMyApprovals();
};

const onChangePage = event => {
  page.value = event.page;
  getMyApprovals();
};

const onReload = () => {
  getMyApprovals();
};

onMounted(() => {
  getMyApprovals();
});

// 정렬기준이 바뀌면 API 호출
watch(sorting, () => {
  getMyApprovals();
});
</script>

<style scoped>
.my-approval-container {
  .criteria.date {
    grid-column: 1 / 7;
  }

  .criteria.radio {
    grid-column: 1 / 4;
  }
}
</style>
