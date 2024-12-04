<template>
  <div>상세내역</div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import HQReturnApi from '@/utils/api/HQReturnApi';

const route = useRoute();
const { detailCode } = route.params;

const stockDetail = ref(null);

const hqReturnApi = new HQReturnApi();

const getPageData = () => {
  hqReturnApi.getReturnStockDetail(detailCode).then(data => {
    stockDetail.value = data;
  });
};

onMounted(() => {
  getPageData();
});
</script>

<style scoped></style>
