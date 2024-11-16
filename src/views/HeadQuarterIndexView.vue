<template>
  <div class="hq-container">
    <HeadQuarterTopBar />
    <RouterView />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router';

import HeadQuarterTopBar from '@/components/headQuarter/HeadQuarterTopBar.vue';
</script>

<style scoped>
.hq-container {
  padding: 10px 10px 10px 10px;
  display: flex;
  flex-direction: column;
  height: 100dvh;
  overflow: hidden;
}
</style>
