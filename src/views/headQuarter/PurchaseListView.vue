<template>
  <div class="purchase-list-container">
    <SearchArea grid :grid-repeat-count="2" grid-repeat-width="1fr" class="purchase-search">
      <AppDateRangePicker v-model:start="startDate" v-model:end="endDate" label="작성일자" />
      <AppInputText v-model="purchaseCodeKeyword" label="발주코드" />
      <AppInputText v-model="purchaseMemberKeyword" label="기안자명" />
      <AppInputText v-model="supplierKeyword" label="거래처명" />
      <AppInputText v-model="storageKeyword" label="창고명" />
    </SearchArea>

    <AppTable
      :columns="columns"
      :paginated-data="paginatedPurchases"
      :total-elements="totalElements"
      @reload="reload"
      @change-page="onChangePage"
    />
  </div>
</template>

<script setup>
import dayjs from 'dayjs';
import { useToast } from 'primevue';
import { computed, onMounted, ref } from 'vue';

import AppTable from '@/components/common/AppTable.vue';
import AppDateRangePicker from '@/components/common/form/AppDateRangePicker.vue';
import AppInputText from '@/components/common/form/AppInputText.vue';
import SearchArea from '@/components/common/SearchArea.vue';
import { PURCHASE_STATUS } from '@/utils/constant';
import { formatKoPurchaseStatus } from '@/utils/format';
import LocalStorageUtil from '@/utils/localStorage';
import { mockupPurchases } from '@/utils/mockup';

const toast = useToast();

const startDate = ref(dayjs().subtract(1, 'year').toDate());
const endDate = ref(new Date());
const purchaseCodeKeyword = ref('');
const purchaseMemberKeyword = ref('');
const supplierKeyword = ref('');
const storageKeyword = ref('');

const paginatedPurchases = ref([]);
const totalElements = ref(0);

const localStorageUtil = new LocalStorageUtil();

function getPurchaseTagSeverity(status) {
  switch (status) {
    case PURCHASE_STATUS.REQUESTED:
      return 'success';

    case PURCHASE_STATUS.CANCELED:
    case PURCHASE_STATUS.REJECTED:
      return 'danger';

    case PURCHASE_STATUS.APPROVED:
      return 'info';

    default:
      return 'info';
  }
}

function clickSend(data) {
  localStorageUtil.saveSendCompletePurchase(data.code);

  toast.add({
    severity: 'success',
    summary: '처리 성공',
    detail: '구매품의서가 회계부서로 전송되었습니다.',
    life: 3000,
  });

  // TODO::reload()
}

const columns = [
  {
    field: 'status',
    header: '상태',
    render: formatKoPurchaseStatus,
    template: {
      tag: {
        getSeverity: getPurchaseTagSeverity,
      },
    },
  },
  {
    field: 'code',
    header: '발주코드',
  },
  { field: 'supplierName', header: '거래처명' },
  { field: 'totalPrice', header: '총 발주금액', alignment: 'right', render: data => data.totalPrice.toLocaleString() },
  { field: 'storageName', header: '창고명' },
  { field: 'username', header: '기안자' },
  { field: 'createdAt', header: '작성일자' },
  { field: 'approvalAt', header: '결재일자' },
  {
    field: '',
    header: '회계팀 전송',
    template: {
      button: [
        {
          getLabel: data => {
            if (localStorageUtil.isSendCompletePurchase(data.code)) return '전송완료';
            return '전송';
          },
          clickHandler: clickSend,
          getDisabled: data => {
            return localStorageUtil.isSendCompletePurchase(data.code);
          },
          getSeverity: data => {
            if (localStorageUtil.isSendCompletePurchase(data.code)) return 'secondary';
            return undefined;
          },
          getHidden: data => {
            return data.status !== PURCHASE_STATUS.APPROVED;
          },
        },
      ],
    },
  },
];

const reload = () => {
  console.log('reload');
};

const onChangePage = event => {
  console.log(event.page, '로 변경됨');
};

onMounted(() => {
  paginatedPurchases.value = [...mockupPurchases].slice(0, 15);
  totalElements.value = 20;
});
</script>

<style scoped>
.purchase-search {
  & > *:nth-child(1) {
    grid-column: 1 / 3;
  }
}
</style>
