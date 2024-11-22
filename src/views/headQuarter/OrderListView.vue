<template>
  <div>
    <!-- 검색 area -->
    <SearchArea grid class="order-search">
      <AppDateRangePicker v-model:start="startDate" v-model:end="endDate" label="사용일자" />
      <!-- <AppSelect v-model="searchFilter" label="검색조건" :options="searchOptions" :initial-value="initialFilter" /> -->
      <AppInputText id="input_name_keyword" v-model="nameKeyword" label="임직원명" />
    </SearchArea>

    <AppTable
      :paginated-data="paginatedOrders"
      :columns="columns"
      :total-elements="orders.length"
      :rows-per-page="pageSize"
      @change-page="onChangePage"
      @reload="reload"
    />

    <DynamicDialog />
  </div>
</template>

<script setup>
import dayjs from 'dayjs';
import { ref, onMounted, computed, watch, defineAsyncComponent } from 'vue';
import { useRouter } from 'vue-router';

import AppTable from '@/components/common/AppTable.vue';
import AppDateRangePicker from '@/components/common/form/AppDateRangePicker.vue';
import AppInputText from '@/components/common/form/AppInputText.vue';
import SearchArea from '@/components/common/SearchArea.vue';
import { useAppConfirmModal } from '@/hooks/useAppConfirmModal';
import { useModal } from '@/hooks/useModal';
import { formatKoDrafterApproved, formatKoOrderStatus } from '@/utils/format';
import { getOrderStatusSeverity, getDrafterApprovedStatusSeverity } from '@/utils/helper';
import { mockupOrders } from '@/utils/mockup';

const router = useRouter();
const { showConfirm } = useAppConfirmModal();
const { openModal } = useModal();

const nameKeyword = ref('');
const orders = ref([]);
const paginatedOrders = computed(() => {
  return orders.value.slice(0, 15);
});
const pageSize = ref(15);
const startDate = ref(dayjs().subtract(1, 'year').toDate());
const endDate = ref(new Date());

const goToDetail = orderCode => {
  router.push({ name: 'hq:order:detail', params: { orderCode } });
};

const columns = [
  { field: 'orderCode', header: '주문번호', sortable: true },
  { field: 'franchiseName', header: '주문지점' },
  { field: 'itemName', header: '주문품목명' },
  { field: 'sumPrice', header: '주문금액' },
  {
    field: 'approvalStatus',
    header: '주문상태',
    render: formatKoOrderStatus,
    template: {
      tag: {
        getSeverity: getOrderStatusSeverity, //
      },
    },
  },
  {
    field: 'drafterApproved',
    header: '최초승인여부',
    render: formatKoDrafterApproved,
    template: {
      tag: {
        getSeverity: getDrafterApprovedStatusSeverity, //
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
          clickHandler: rowData => goToDetail(rowData.orderCode),
        },
      ],
    },
  },
];

const onChangePage = event => {
  const { page } = event;
  console.log(page, '페이지로 변경되었다!');
};

const reload = () => {
  console.log('reload 테이블');
};

onMounted(() => {
  orders.value = [...mockupOrders];
});
``;
</script>

<style scoped>
.order-search {
  .criteria.use-date {
    grid-column: 1 / 7;
  }
}
</style>
