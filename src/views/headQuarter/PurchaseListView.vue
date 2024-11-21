<template>
  <div class="purchase-list-container">
    <SearchArea grid :grid-repeat-count="2" grid-repeat-width="1fr" class="purchase-search">
      <AppDateRangePicker v-model:start="startDate" v-model:end="endDate" label="작성일자" />
      <AppInputText v-model="purchaseCodeKeyword" label="발주코드" />
      <AppInputText v-model="purchaseMemberKeyword" label="기안자명" />
      <AppInputText v-model="supplierKeyword" label="거래처명" />
      <AppInputText v-model="storageKeyword" label="창고명" />
    </SearchArea>

    <AppTable :columns="columns" :paginated-data="paginatedPurchases" :total-elements="purchases.length" />
  </div>
</template>

<script setup>
import dayjs from 'dayjs';
import { Button } from 'primevue';
import { computed, onMounted, ref } from 'vue';

import AppTable from '@/components/common/AppTable.vue';
import AppDateRangePicker from '@/components/common/form/AppDateRangePicker.vue';
import AppInputText from '@/components/common/form/AppInputText.vue';
import SearchArea from '@/components/common/SearchArea.vue';
import { PURCHASE_STATUS } from '@/utils/constant';
import { formatKoPurchaseStatus } from '@/utils/format';
import { mockupPurchases } from '@/utils/mockup';

const startDate = ref(dayjs().subtract(1, 'year').toDate());
const endDate = ref(new Date());
const purchaseCodeKeyword = ref('');
const purchaseMemberKeyword = ref('');
const supplierKeyword = ref('');
const storageKeyword = ref('');

const purchases = ref([]);
const paginatedPurchases = computed(() => {
  return purchases.value.slice(0, 15);
});

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
  console.log(data);
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
  },
];

onMounted(() => {
  purchases.value = [...mockupPurchases];
});
</script>

<style scoped>
.purchase-search {
  & > *:nth-child(1) {
    grid-column: 1 / 3;
  }
}
</style>
