<template>
  <div>
    <FullCalendar
      :options="{
        plugins: [dayGridPlugin],
        initialView: 'dayGridMonth',
        locale: koLocale,
        dayCellContent: renderDayCellContent,
      }"
    />
  </div>
</template>

<script setup>
import koLocale from '@fullcalendar/core/locales/ko';
import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/vue3';
import { onMounted, ref } from 'vue';

import HQStatisticsApi from '@/utils/api/HQStatisticsApi';

const year = ref(new Date().getFullYear());
const month = ref(new Date().getMonth());

const hqStatisticsApi = new HQStatisticsApi();

const renderDayCellContent = arg => {
  return arg.date.getDate();
};

onMounted(() => {
  hqStatisticsApi.getOrderCalendarData(year.value, month.value + 1).then(data => {});
});
</script>

<style scoped></style>
