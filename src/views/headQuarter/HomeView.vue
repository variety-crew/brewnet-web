<template>
  <div class="hq-home-container">
    <PageTitle class="no-margin">대시보드</PageTitle>
    <div class="content">
      <div class="left">
        <DashboardChartCard />
        <DashboardCalendarCard ref="dashboardCalendarCard" />
      </div>
      <div class="right">
        <DashboardMyApprovalWaitCard @fetched-data="onFetchedData" />
        <DashboardNewOrderCard @fetched-data="onFetchedData" />
        <DashboardSafetyStockCard @fetched-data="onFetchedData" />
      </div>
    </div>

    <LoadingSpinner />
  </div>
</template>

<script setup>
import { ref } from 'vue';

import LoadingSpinner from '@/components/common/LoadingSpinner.vue';
import DashboardCalendarCard from '@/components/headQuarter/DashboardCalendarCard.vue';
import DashboardChartCard from '@/components/headQuarter/DashboardChartCard.vue';
import DashboardMyApprovalWaitCard from '@/components/headQuarter/DashboardMyApprovalWaitCard.vue';
import DashboardNewOrderCard from '@/components/headQuarter/DashboardNewOrderCard.vue';
import DashboardSafetyStockCard from '@/components/headQuarter/DashboardSafetyStockCard.vue';
import PageTitle from '@/components/headQuarter/PageTitle.vue';

const dashboardCalendarCard = ref();

const onFetchedData = () => {
  dashboardCalendarCard.value.updateCalendarSize();
};
</script>

<style scoped>
.hq-home-container {
  padding: 32px 24px;
  overflow-y: auto;

  .content {
    display: flex;
    gap: 16px;
    margin-top: 20px;

    .left {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .right {
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
  }

  .no-margin {
    margin: 0;
  }
}
</style>
