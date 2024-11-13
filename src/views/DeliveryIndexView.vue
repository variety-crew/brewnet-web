<template>
  <div>배송 기본 레이아웃 페이지</div>
  <div>
    <Button label="로그아웃" @click="clickLogout" />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
const router = useRouter();

const clickLogout = () => {
  userStore.logout();
  router.replace({ name: 'auth:login' });
};
</script>

<style scoped></style>
