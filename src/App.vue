<template>
  <RouterView />

  <AppConfirmModal />
  <DynamicDialog />
  <Toast position="top-center" />
</template>

<script setup>
import { RouterView } from 'vue-router';

import AppConfirmModal from './components/common/AppConfirmModal.vue';
</script>

<style scoped></style>
