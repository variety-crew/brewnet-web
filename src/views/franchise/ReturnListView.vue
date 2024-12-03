<template>
  <div>
    <AppTable
      :columns="columns"
      :total-elements="totalElements"
      :rows-per-page="pageSize"
      :paginated-data="paginatedReturnList"
      @reload="onReload"
    />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import AppTable from '@/components/common/AppTable.vue';
import FCReturnApi from '@/utils/api/FCReturnApi';
import { formatKoReturnStatus } from '@/utils/format';
import { getReturnStatusSeverity } from '@/utils/helper';

const router = useRouter();

const paginatedReturnList = ref([]);
const page = ref(0);
const pageSize = ref(15);
const totalElements = ref(0);

const fcReturnApi = new FCReturnApi();

const getReturnList = () => {
  fcReturnApi.getReturnList({ page: page.value, pageSize: pageSize.value }).then(data => {
    paginatedReturnList.value = data.content;
    totalElements.value = data.totalElements;
  });
};

const columns = [
  {
    field: 'status',
    header: '상태',
    render: data => formatKoReturnStatus(data.status),
    template: {
      tag: {
        getSeverity: data => getReturnStatusSeverity(data.status),
      },
    },
  },
  { field: 'orderCode', header: '주문코드' },
  { field: 'itemName', header: '주문품목명' },
  { field: 'sumPrice', header: '주문금액', render: data => data.sumPrice.toLocaleString() },
  { field: 'createdAt', header: '반품신청일자' },
  { field: 'completedAt', header: '완료일자' },
  {
    field: '',
    header: '',
    template: {
      button: [
        {
          getLabel: () => '상세보기',
          clickHandler: data => {
            router.push({ name: 'fc:home:return:detail', params: { returnCode: data.returningCode } });
          },
        },
      ],
    },
  },
];

const onReload = () => {
  getReturnList();
};

onMounted(() => {
  getReturnList();
});
</script>

<style scoped></style>
