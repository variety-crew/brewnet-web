<template>
  <div class="hq-home-container">
    <PageTitle>대시보드</PageTitle>
    <div class="content">
      <div class="left"></div>
      <div class="right">
        <MyApprovalWaitCard />
      </div>
    </div>
  </div>
</template>

<script setup>
import AppTableStyled from '@/components/common/AppTableStyled.vue';
import MyApprovalWaitCard from '@/components/headQuarter/MyApprovalWaitCard.vue';
import PageTitle from '@/components/headQuarter/PageTitle.vue';
</script>

<style scoped>
.hq-home-container {
  padding: 32px 24px;

  .content {
    display: flex;
    gap: 16px;
    margin-top: 20px;

    .right {
      flex-shrink: 0;
    }
  }
}
</style>
