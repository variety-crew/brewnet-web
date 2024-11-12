<template>
  <div class="hq-container">
    <HeadQuarterTopBar />
    <RouterView />
  </div>
</template>

<script setup>
import HeadQuarterTopBar from '@/components/headQuarter/HeadQuarterTopBar.vue';
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';
import { RouterView } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();

const clickLogout = () => {
  userStore.logout();
  router.replace({ name: 'auth:login' });
};
</script>

<style scoped>
.hq-container {
  padding: 10px 10px 0 10px;
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
