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
      <AppSelect v-model="searchFilter" label="검색조건" :options="searchOptions" :initial-value="searchFilter" />
      <AppInputText id="input_name_keyword" v-model="nameKeyword" label="검색어" />
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
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

import AppTable from '@/components/common/AppTable.vue';
import AppDateRangePicker from '@/components/common/form/AppDateRangePicker.vue';
import AppInputText from '@/components/common/form/AppInputText.vue';
import SearchArea from '@/components/common/SearchArea.vue';
import { useUserStore } from '@/stores/user';
import FCOrderQueryApi from '@/utils/api/FCOOrderQueryApi';
import { formatKoOrderStatus } from '@/utils/format';
import { getOrderStatusSeverity } from '@/utils/helper';

const router = useRouter();

const nameKeyword = ref('');
const totalElements = ref(0);
const page = ref(0);
const size = ref(15);

const getInitialCriteria = () => ({
  startDate: dayjs().subtract(1, 'year').toDate(),
  endDate: new Date(),
  orderCode: null,
  managerName: null,
  franchiseName: null,
});

const criteria = ref(getInitialCriteria());
const paginatedOrders = ref([]);
const FcOrderApi = new FCOrderQueryApi();
const searchFilter = ref('orderCode');
const searchOptions = [
  { label: '주문번호', value: 'orderCode' },
  { label: '주문품목명', value: 'itemName' },
];

function clickGoDetail(data) {
  router.push({ name: 'fc:home:order:detail', params: { orderCode: data.orderCode } });
}

const columns = [
  {
    field: 'recentOrderStatus',
    header: '주문상태',
    render: data => formatKoOrderStatus(data.recentOrderStatus),
    template: {
      tag: {
        getSeverity: data => getOrderStatusSeverity(data.recentOrderStatus),
      },
    },
  },
  { field: 'orderCode', header: '주문번호' },
  {
    field: 'itemName',
    header: '주문품목명',
    render: data => data.orderItemList.map(item => item.name).join(', '),
  },
  { field: 'sumPrice', header: '주문금액', render: data => data.sumPrice.toLocaleString() },
  { field: 'createdAt', header: '주문일자' },
  {
    field: 'recentOrderStatusCreatedAt',
    header: '완료일자',
    render: data => (data.recentOrderStatus === 'SHIPPED' ? data.recentOrderStatusCreatedAt : ''), // Display only if status is SHIPPED
  },
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
  FcOrderApi.getOrders({
    page: page.value,
    size: size.value,
    startDate: criteria.value.startDate,
    endDate: criteria.value.endDate,
    orderCode: criteria.value.orderCode,
    managerName: criteria.value.managerName,
    franchiseName: useUserStore.franchiseName,
  }).then(data => {
    totalElements.value = data.totalElements;
    paginatedOrders.value = data.content;
  });
};

const onSearch = () => {
  // TODO
  getOrders();
};

const onReset = () => {
  // TODO
  criteria.value = getInitialCriteria();
  getOrders();
};

const reloadData = () => {
  getOrders();
};

const onChangePage = event => {
  page.value = event.page + 1;
  getOrders();
};

onMounted(() => {
  getOrders();
});
``;
</script>

<style scoped>
.order-search {
  .criteria.created-at {
    grid-column: 1 / 7;
  }
}
</style>
