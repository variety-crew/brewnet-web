<template>
  <RouterView />

  <AppConfirmModal />
  <Toast position="top-center" />
  <BigImageModal />
</template>

<script setup>
import { RouterView } from 'vue-router';

import AppConfirmModal from './components/common/AppConfirmModal.vue';
import BigImageModal from './components/common/BigImageModal.vue';
</script>

<style scoped></style>
