<template>
  <div>
    <Button label="본사 로그인" @click="clickLoginByHeadQuarter" />
    <Button label="가맹점 로그인" @click="clickLoginByFranchise" />
    <Button label="배송기사 로그인" @click="clickLoginByDelivery" />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
const router = useRouter();

const clickLoginByHeadQuarter = () => {
  userStore.loginByHeadQuarter();
  router.replace({ name: 'hq:home' });
};

const clickLoginByFranchise = () => {
  userStore.loginByFranchise();
  router.replace({ name: 'fc:home' });
};

const clickLoginByDelivery = () => {
  userStore.loginByDelivery();
  router.replace({ name: 'd:home' });
};
</script>

<style scoped></style>
