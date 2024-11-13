<template>
  <div class="fc-container">
    <FranchiseeTopBar />
    <RouterView />
  </div>
</template>

<script setup>
import FranchiseeTopBar from '@/components/franchisee/FranchiseeTopBar.vue';
import { RouterView } from 'vue-router';
</script>

<style scoped>
.fc-container {
  padding: 10px 10px 10px 10px;
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
