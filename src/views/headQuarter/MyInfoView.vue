<template>
  <div class="my-info-container">
    <AppLabelText label="아이디" :text="userStore.loginId" />
    <AppLabelText label="성명" :text="userStore.username" />
    <AppLabelText label="이메일" :text="userStore.email" />
    <AppLabelText label="휴대폰번호" :text="userStore.phone" />
    <AppLabelText label="직급" :text="formatKoEmployeePosition(userStore.position)" />
    <AppLabelText label="서명" :text="userStore.signUrl || '등록된 서명이 없습니다.'" />

    <div class="button-area">
      <Button size="small" label="비밀번호 변경" variant="outlined" severity="secondary" @click="clickChangePassword" />
      <Button size="small" label="서명 업로드" variant="outlined" severity="secondary" />
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

import AppLabelText from '@/components/common/AppLabelText.vue';
import { useUserStore } from '@/stores/user';
import { formatKoEmployeePosition } from '@/utils/format';

const userStore = useUserStore();
const router = useRouter();

const clickChangePassword = () => {
  router.push({ name: 'hq:my:change-password' });
};
</script>

<style scoped>
.my-info-container {
  display: flex;
  flex-direction: column;
  gap: 20px;

  .button-area {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 30px;
  }
}
</style>
