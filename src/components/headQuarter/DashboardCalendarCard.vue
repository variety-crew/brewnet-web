<template>
  <Card class="dashboard-calendar-card">
    <template #title>
      <h4>주문 캘린더</h4>
    </template>
    <template #content>
      <FullCalendar
        ref="fullCalendar"
        :options="{
          plugins: [dayGridPlugin],
          initialView: 'dayGridMonth',
          locale: koLocale,
          dayCellContent: renderDayCellContent,
          fixedWeekCount: false,
          showNonCurrentDates: false,
          height: 500,
          datesSet: onSetDates,
          eventSources: [
            {
              events: orderPriceEvents,
              backgroundColor: 'transparent',
              borderColor: 'transparent',
              textColor: 'var(--p-primary-700)',
            },
          ],
        }"
      />
    </template>
  </Card>
</template>

<script setup>
import koLocale from '@fullcalendar/core/locales/ko';
import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/vue3';
import { computed, ref } from 'vue';

import HQStatisticsApi from '@/utils/api/HQStatisticsApi';

const orderData = ref([]);
const orderPriceEvents = computed(() => {
  return orderData.value.map(e => ({
    title: `${e.orderPrice.toLocaleString()}원 (${e.orderCount}건)`,
    start: e.date,
  }));
});
const fullCalendar = ref(); // DOM ref
const calendarApi = computed(() => {
  if (!fullCalendar.value) return null;
  return fullCalendar.value.getApi();
});

const hqStatisticsApi = new HQStatisticsApi();

const renderDayCellContent = arg => {
  return arg.date.getDate();
};

const onSetDates = dateInfo => {
  const { start, end } = dateInfo;

  const currentYear = start.getFullYear();
  const currentMonth = start.getMonth();

  hqStatisticsApi.getOrderCalendarData(currentYear, currentMonth + 1).then(data => {
    orderData.value = data;
  });
};

const updateCalendarSize = () => {
  if (!calendarApi.value) return;
  console.log('calendar size update');
  calendarApi.value.updateSize();
};

// parent 컴포넌트에서 사용할 수 있도록 설정
defineExpose({ updateCalendarSize });
</script>

<style scoped>
.dashboard-calendar-card {
  box-shadow: var(--p-primary-100) 0px 2px 8px 0px;
}
</style>
