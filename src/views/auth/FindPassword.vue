<template>
  <form class="find-password-container" @submit.prevent="onSubmit">
    <h2>비밀번호 찾기</h2>
    <AppInputText v-model="id" label="아이디" full-width />
    <div class="email-area">
      <AppInputText v-model="email" label="이메일" full-width />
      <Button
        :label="isSend ? '재전송' : '인증번호 전송'"
        variant="outlined"
        severity="secondary"
        size="small"
        @click="clickSendVerifyCode"
      />
    </div>
    <AppInputText v-model="verifyCode" label="인증번호 입력" full-width />
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

import AppInputText from '@/components/common/form/AppInputText.vue';

const router = useRouter();
const toast = useToast();

const id = ref('');
const email = ref('');
const verifyCode = ref('');
const isSend = ref(false);

const goBack = () => {
  router.back();
};

const checkFormSendCode = () => {
  try {
    if (!id.value) throw new Error('아이디를 입력해주세요.');
    if (!email.value) throw new Error('이메일을 입력해주세요.');

    return true;
  } catch (e) {
    toast.add({ severity: 'error', summary: '입력 확인', detail: e.message, life: 3000 });
    return false;
  }
};

const clickSendVerifyCode = () => {
  const isPass = checkFormSendCode();
  if (isPass) {
    console.log('인증번호 전송 API 호출 필요');
    isSend.value = true;
  }
};

const checkForm = () => {
  try {
    if (!isSend.value) throw new Error('인증번호를 먼저 전송해주세요.');
    if (!verifyCode.value) throw new Error('인증번호를 입력해주세요');

    return true;
  } catch (e) {
    toast.add({ severity: 'error', summary: '입력 확인', detail: e.message, life: 3000 });
    return false;
  }
};

const onSubmit = () => {
  const isPass = checkForm();
  if (isPass) {
    console.log('비밀번호 찾기 API 연동 필요');
  }
};
</script>

<style scoped>
.find-password-container {
  display: flex;
  flex-direction: column;
  gap: 10px;

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
