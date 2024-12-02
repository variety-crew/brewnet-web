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

import AppTable from '@/components/common/AppTable.vue';
import FCReturnApi from '@/utils/api/FCReturnApi';

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

const columns = [];

const onReload = () => {
  getReturnList();
};

onMounted(() => {
  getReturnList();
});
</script>

<style scoped></style>
