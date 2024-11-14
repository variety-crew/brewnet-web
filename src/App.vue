<template>
  <RouterView />

  <AppConfirmModal />
  <DynamicDialog />
</template>

<script setup>
import { RouterView } from 'vue-router';

import AppConfirmModal from './components/common/AppConfirmModal.vue';
</script>

<style scoped></style>
