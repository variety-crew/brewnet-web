<template>
  <div>
    <!-- 검색 area -->
    <SearchArea grid class="order-search" @search="onSearch" @form-reset="onReset">
      <AppDateRangePicker
        v-model:start="criteria.startDate"
        v-model:end="criteria.endDate"
        label="작성일자"
        class="criteria created-at"
      />
      <AppSelect
        v-model="criteria.criteria"
        label="검색조건"
        :options="searchOptions"
        :initial-value="criteria.criteria"
      />
      <AppInputText id="input_name_keyword" v-model="criteria.keyword" label="검색어" />
    </SearchArea>

    <AppTable
      :paginated-data="paginatedOrders"
      :columns="columns"
      :total-elements="totalElements"
      :rows-per-page="size"
      @reload="reloadData"
      @change-page="onChangePage"
    />

    <DynamicDialog />
  </div>
</template>

<script setup>
import dayjs from 'dayjs';
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';

import AppTable from '@/components/common/AppTable.vue';
import AppDateRangePicker from '@/components/common/form/AppDateRangePicker.vue';
import AppInputText from '@/components/common/form/AppInputText.vue';
import AppSelect from '@/components/common/form/AppSelect.vue';
import SearchArea from '@/components/common/SearchArea.vue';
import HQOrderApi from '@/utils/api/HQOrderApi';
import { CRITERIA_HQ_ORDER_LIST, SEARCH_CRITERIA } from '@/utils/constant';
import { formatKoApproval, formatKoDrafterApproved, formatKoOrderStatus, formatKoSearchCriteria } from '@/utils/format';
import {
  getOrderStatusSeverity,
  getDrafterApprovedStatusSeverity,
  getApprovalStatusSeverity,
  makeSelectOption,
} from '@/utils/helper';

const router = useRouter();

const totalElements = ref(0);
const page = ref(0);
const size = ref(15);

const getInitialCriteria = () => ({
  startDate: dayjs().subtract(1, 'year').toDate(),
  endDate: new Date(),
  criteria: SEARCH_CRITERIA.ORDER_CODE,
  keyword: '',
});

const criteria = ref(getInitialCriteria());
const paginatedOrders = ref([]);
const hqOrderApi = new HQOrderApi();
const searchOptions = computed(() => {
  return CRITERIA_HQ_ORDER_LIST.map(e => makeSelectOption(formatKoSearchCriteria(e), e));
});

function clickGoDetail(data) {
  router.push({ name: 'hq:order:detail', params: { orderCode: data.orderCode } });
}

const getMostRecentOrderStatus = orderStatusHistoryList => {
  if (!orderStatusHistoryList?.length) return '';

  const sortedList = [...orderStatusHistoryList].sort(
    (a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf(),
  );

  return sortedList[0].orderHistoryStatus;
};

const columns = [
  {
    field: 'orderStatusHistoryList',
    header: '주문상태',
    sortable: true,
    render: data => formatKoOrderStatus(getMostRecentOrderStatus(data.orderStatusHistoryList)),
    template: {
      tag: {
        getSeverity: data => getOrderStatusSeverity(getMostRecentOrderStatus(data.orderStatusHistoryList)),
      },
    },
  },
  { field: 'orderCode', header: '주문번호', sortable: true },
  { field: 'orderFranchise.franchiseName', header: '주문지점' },
  { field: 'orderFranchise.itemName', header: '주문품목명' },
  { field: 'sumPrice', header: '주문금액', alignment: 'right', render: data => data.sumPrice.toLocaleString() },
  {
    field: 'approvalStatus',
    header: '결재상태',
    render: data => formatKoApproval(data.approvalStatus),
    template: {
      tag: {
        getSeverity: data => getApprovalStatusSeverity(data.approvalStatus),
      },
    },
  },
  {
    field: 'drafterApproved',
    header: '최초승인여부',
    render: data => formatKoDrafterApproved(data.drafterApproved),
    template: {
      tag: {
        getSeverity: data => getDrafterApprovedStatusSeverity(data.drafterApproved), //
      },
    },
  },
  { field: 'managerName', header: '주문담당자' },
  { field: 'createdAt', header: '주문일자', sortable: true },
  {
    field: '',
    header: '',
    template: {
      button: [
        {
          getLabel: () => '상세보기',
          clickHandler: clickGoDetail,
        },
      ],
    },
  },
];

const getOrders = () => {
  hqOrderApi
    .searchOrders({
      page: page.value,
      size: size.value,
      startDate: criteria.value.startDate,
      endDate: criteria.value.endDate,
      criteria: criteria.value.criteria,
      keyword: criteria.value.keyword,
    })
    .then(data => {
      totalElements.value = data.totalElements;
      paginatedOrders.value = data.content;
    });
};

const reloadData = () => {
  getOrders();
};

const onChangePage = event => {
  page.value = event.page;
  getOrders();
};

const onSearch = () => {
  getOrders();
};

const onReset = () => {
  criteria.value = getInitialCriteria();
  page.value = 0;
  getOrders();
};

onMounted(() => {
  getOrders();
});
</script>

<style scoped>
.order-search {
  .criteria.created-at {
    grid-column: 1 / 7;
  }
}
</style>
