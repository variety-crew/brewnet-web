<template>
  <Card class="dashboard-chart-card">
    <template #title>
      <h4>주문 통계</h4>
    </template>
    <template #content>
      <AppDateRangePicker v-model:start="startDate" v-model:end="endDate" label="기간 설정" label-position="left" />
      <Bar
        id="my-chart-id"
        :options="{ responsive: true }"
        :data="{
          labels: ['주문', '교환', '반품'],
          datasets: [
            {
              label: '주문/교환/반품 수',
              data: [orderCount, exchangeCount, returnCount],
              backgroundColor: ['rgba(54, 162, 235, 0.2)', 'rgba(255, 205, 86, 0.2)', 'rgba(255, 99, 132, 0.2)'],
              borderColor: ['rgb(54, 162, 235)', 'rgb(255, 205, 86)', 'rgb(255, 99, 132)'],
              borderWidth: 1,
            },
          ],
        }"
      />
    </template>
  </Card>
</template>

<script setup>
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import dayjs from 'dayjs';
import { onMounted, ref } from 'vue';
import { Bar } from 'vue-chartjs';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

import HQStatisticsApi from '@/utils/api/HQStatisticsApi';

import AppDateRangePicker from '../common/form/AppDateRangePicker.vue';

const startDate = ref(dayjs().subtract(30, 'day').toDate());
const endDate = ref(new Date());
const orderCount = ref(0);
const exchangeCount = ref(0);
const returnCount = ref(0);

const hqStatisticsApi = new HQStatisticsApi();

onMounted(() => {
  hqStatisticsApi.getOrderGraphData(startDate.value, endDate.value).then(data => {
    orderCount.value = data.orderCount;
    exchangeCount.value = data.exchangeCount;
    returnCount.value = data.returnCount;
  });
});
</script>

<style scoped>
.dashboard-chart-card {
  box-shadow: var(--p-primary-100) 0px 2px 8px 0px;
}
</style>
