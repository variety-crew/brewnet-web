<template>
  <div class="hq-container">
    <HeadQuarterTopBar />
    <RouterView />
  </div>
</template>

<script setup>
import HeadQuarterTopBar from '@/components/headQuarter/HeadQuarterTopBar.vue';
import { RouterView } from 'vue-router';
</script>

<style scoped>
.hq-container {
  padding: 10px 10px 10px 10px;
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
