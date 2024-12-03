<template>
  <div>
    <AppTable
      :columns="columns"
      :total-elements="totalElements"
      :rows-per-page="pageSize"
      :paginated-data="paginatedReturnList"
    />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import AppTable from '@/components/common/AppTable.vue';
import HQReturnApi from '@/utils/api/HQReturnApi';

const router = useRouter();

const paginatedReturnList = ref([]);
const page = ref(0);
const pageSize = ref(15);
const totalElements = ref(0);

const goToDetail = () => {
  router.push({ name: 'hq:order:return:detail', params: { returnCode: 'dddd' } });
};

const hqReturnApi = new HQReturnApi();

const getReturnList = () => {
  hqReturnApi.getReturnList({ page: page.value, pageSize: pageSize.value }).then(data => {
    paginatedReturnList.value = data.content;
    totalElements.value = data.totalElements;
  });
};

const columns = [];

onMounted(() => {
  getReturnList();
});
</script>

<style scoped></style>
