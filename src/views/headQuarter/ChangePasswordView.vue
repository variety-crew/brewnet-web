<template>
  <div class="change-password-container">
    <AuthorizationRequiredArea v-model="isAuthorized"> </AuthorizationRequiredArea>
  </div>
</template>

<script setup>
import { ref } from 'vue';

import AuthorizationRequiredArea from '@/components/common/AuthorizationRequiredArea.vue';

const isAuthorized = ref(false);
</script>

<style scoped></style>
