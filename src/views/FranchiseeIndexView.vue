<template>
  <div>가맹점 기본 레이아웃 페이지</div>
  <div>
    <Button label="로그아웃" @click="clickLogout" />
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();

const clickLogout = () => {
  userStore.logout();
  router.replace({ name: 'auth:login' });
};
</script>

<style scoped></style>
