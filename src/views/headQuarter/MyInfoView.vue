<template>
  <div class="my-info-container">
    <AppLabelText label="아이디" :text="userStore.loginId" />
    <AppLabelText label="성명" :text="userStore.username" />
    <AppLabelText label="이메일" :text="userStore.email" />
    <AppLabelText label="휴대폰번호" :text="userStore.phone" />
    <AppLabelText label="직급" :text="formatKoEmployeePosition(userStore.position)" />
    <div>
      <AppLabelText label="서명" :text="userStore.signature || '등록된 서명이 없습니다.'" />
      <Button
        v-if="userStore.signature"
        label="서명 삭제"
        size="small"
        severity="secondary"
        variant="outlined"
        @click="clickRemoveSignature"
      />
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

const clickRemoveSignature = () => {
  console.log('서명 삭제 API');
};
</script>

<style scoped>
.my-info-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
