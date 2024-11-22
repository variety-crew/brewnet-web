<template>
  <div>
    <text>
      {{ criteria.startDate }}
      {{ criteria.managerName }}
    </text>
    <!-- 검색 area -->
    <SearchArea grid class="order-search">
      <AppDateRangePicker
        v-model:start="criteria.startDate"
        v-model:end="criteria.endDate"
        label="작성일자"
        class="criteria created-at"
      />
      <!-- <AppSelect v-model="searchFilter" label="검색조건" :options="searchOptions" :initial-value="initialFilter" /> -->
      <AppInputText id="input_name_keyword" v-model="nameKeyword" label="임직원명" />
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
import { useToast } from 'primevue';
import { ref, onMounted, computed, watch, defineAsyncComponent } from 'vue';
import { useRouter } from 'vue-router';

import AppTable from '@/components/common/AppTable.vue';
import AppDateRangePicker from '@/components/common/form/AppDateRangePicker.vue';
import AppInputText from '@/components/common/form/AppInputText.vue';
import SearchArea from '@/components/common/SearchArea.vue';
import { useAppConfirmModal } from '@/hooks/useAppConfirmModal';
import { useModal } from '@/hooks/useModal';
import HQOrderApi from '@/utils/api/HQOrderApi';
import { ORDER_STATUS, APPROVAL_STATUS } from '@/utils/constant';
import { formatKoApproval, formatKoDrafterApproved, formatKoOrderStatus } from '@/utils/format';
import { getOrderStatusSeverity, getDrafterApprovedStatusSeverity, getApprovalStatusSeverity } from '@/utils/helper';
import LocalStorageUtil from '@/utils/localStorage';

const toast = useToast();
const router = useRouter();
const { showConfirm } = useAppConfirmModal();
const { openModal } = useModal();

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
  // purchaseCodeKeyword: null,
  // purchaseMemberKeyword: null,
  // supplierKeyword: null,
  // storageKeyword: null,
});

const criteria = ref(getInitialCriteria());
const paginatedOrders = ref([]);
const hqOrderApi = new HQOrderApi();

function clickGoDetail(data) {
  router.push({ name: 'hq:order:detail', params: { orderCode: data.orderCode } });
}

const columns = [
  { field: 'orderCode', header: '주문번호', sortable: true },
  { field: 'franchiseName', header: '주문지점' },
  { field: 'itemName', header: '주문품목명' },
  { field: 'sumPrice', header: '주문금액', alignment: 'right', render: data => data.sumPrice.toLocaleString() },
  //   {
  //     field: 'approvalStatus',
  //     header: '주문전체 결재 상태',
  //     render: formatKoApproval,
  //     template: {
  //       tag: {
  //         getSeverity: getApprovalStatusSeverity,
  //       },
  //     },
  //   },

  // 수정필요
  // {
  //   field: 'xxxxxxxxxxxxxxxxxxxxxx',
  //   header: '주문상태',
  //   render: formatKoOrderStatus,
  //   template: {
  //     tag: {
  //       getSeverity: getOrderStatusSeverity,
  //     },
  //   },
  // },
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
          clickHandler: clickGoDetail,
        },
      ],
    },
  },
];

const getOrders = () => {
  hqOrderApi
    .getOrders({
      page: page.value,
      size: size.value,
      startDate: criteria.value.startDate,
      endDate: criteria.value.endDate,
      orderCode: criteria.value.orderCode,
      managerName: criteria.value.managerName,
      franchiseName: criteria.value.franchiseName,
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
  .criteria.use-date {
    grid-column: 1 / 7;
  }
}
</style>
