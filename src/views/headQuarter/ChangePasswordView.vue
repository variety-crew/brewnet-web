<template>
  <div class="change-password-container">
    <AuthorizationRequiredArea v-model="isAuthorized">
      <form class="change-password-form-container" @submit.prevent="onSubmit">
        <AppInputPassword
          v-model="password"
          placeholder="새로운 비밀번호 입력"
          name="password"
          class="mb-2"
          full-width
          label="새 비밀번호"
        />
        <AppInputPassword
          v-model="confirmPassword"
          placeholder="비밀번호 재입력"
          name="confirmPassword"
          full-width
          class="mb-5"
        />

        <Button type="submit" label="비밀번호 변경" size="small" fluid />
      </form>
    </AuthorizationRequiredArea>
  </div>
</template>

<script setup>
import { useToast } from 'primevue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import AuthorizationRequiredArea from '@/components/common/AuthorizationRequiredArea.vue';
import AppInputPassword from '@/components/common/form/AppInputPassword.vue';

const toast = useToast();
const router = useRouter();

const isAuthorized = ref(false);
const password = ref('');
const confirmPassword = ref('');

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
    console.log('비밀번호 변경 API 호출');
    toast.add({
      severity: 'success',
      summary: '성공',
      detail: '비밀번호가 변경되었습니다.',
      life: 3000,
    });
    router.replace({ name: 'hq:my:info' });
  }
};
</script>

<style scoped>
.change-password-form-container {
  width: 400px;
}
</style>
