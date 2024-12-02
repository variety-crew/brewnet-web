<template>
  <div class="hq-home-container">
    <PageTitle class="no-margin">대시보드</PageTitle>
    <div class="content">
      <div class="left">
        <DashboardCalendar />
      </div>
      <div class="right">
        <DashboardMyApprovalWaitCard />
        <DashboardNewOrderCard />
        <DashboardSafetyStockCard />
      </div>
    </div>
  </div>
</template>

<script setup>
import DashboardCalendar from '@/components/headQuarter/DashboardCalendar.vue';
import DashboardMyApprovalWaitCard from '@/components/headQuarter/DashboardMyApprovalWaitCard.vue';
import DashboardNewOrderCard from '@/components/headQuarter/DashboardNewOrderCard.vue';
import DashboardSafetyStockCard from '@/components/headQuarter/DashboardSafetyStockCard.vue';
import PageTitle from '@/components/headQuarter/PageTitle.vue';
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
