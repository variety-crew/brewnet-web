<template>
  <div class="hq-container">
    <TopBar />
    <RouterView />
  </div>
</template>

<script setup>
import TopBar from '@/components/common/TopBar.vue';
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
