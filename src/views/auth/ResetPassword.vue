<template>
  <form class="reset-password-container" @submit.prevent="onSubmit">
    <h2>비밀번호 재설정</h2>

    <div>
      <AppInputPassword v-model="password" placeholder="새로운 비밀번호 입력" name="password" class="mb-2" full-width />
      <AppInputPassword v-model="confirmPassword" placeholder="비밀번호 재입력" name="confirmPassword" full-width />
    </div>

    <div class="bottom-button-area">
      <Button label="돌아가기" variant="text" @click="goBack" />
      <Button label="확인" type="submit" />
    </div>
  </form>
</template>

<script setup>
import { useToast } from 'primevue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import AppInputPassword from '@/components/common/form/AppInputPassword.vue';

const router = useRouter();
const toast = useToast();

const password = ref('');
const confirmPassword = ref('');

const goBack = () => {
  router.back();
};

const checkForm = () => {
  try {
    if (!password.value) throw new Error('새 비밀번호를 입력해주세요.');
    if (!confirmPassword.value) throw new Error('비밀번호를 다시 입력해주세요.');
    if (password.value !== confirmPassword.value) throw new Error('두 비밀번호가 일치하지 않습니다.');

    return true;
  } catch (e) {
    toast.add({ severity: 'error', summary: '입력 확인', detail: e.message, life: 3000 });
    return false;
  }
};

const onSubmit = () => {
  const isPass = checkForm();
  if (isPass) {
    console.log('비밀번호 재설정 API 호출');
    toast.add({
      severity: 'success',
      summary: '성공',
      detail: '비밀번호가 재설정되었습니다. 새로운 비밀번호로 로그인해주세요.',
      life: 4000,
    });
    router.replace({ name: 'auth:login' });
  }
};
</script>

<style scoped>
.reset-password-container {
  display: flex;
  flex-direction: column;
  gap: 20px;

  .email-area {
    display: flex;
    align-items: flex-end;
    gap: 10px;

    button {
      flex-shrink: 0;
    }
  }

  .bottom-button-area {
    display: grid;
    grid-template-columns: 1fr 2.5fr;
    gap: 20px;
  }
}
</style>
