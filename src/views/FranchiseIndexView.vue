<template>
  <div class="fc-container">
    <FranchiseTopBar />
    <RouterView />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router';

import FranchiseTopBar from '@/components/franchise/FranchiseTopBar.vue';
</script>

<style scoped>
.fc-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
