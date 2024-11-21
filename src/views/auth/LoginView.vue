<template>
  <form class="login-container" @submit.prevent="login">
    <!-- 아이디 -->
    <IconField>
      <InputIcon class="pi pi-user" />
      <InputText v-model="id" placeholder="아이디 입력" fluid class="input" />
    </IconField>

    <!-- 패스워드 -->
    <IconField>
      <InputIcon class="pi pi-lock" />
      <InputText v-model="password" placeholder="비밀번호 입력" fluid class="input" type="password" />
    </IconField>

    <div class="middle">
      <AppCheck v-model="saveAuth" label="로그인 정보 저장" />
      <Button label="비밀번호 찾기" variant="text" size="small" as="router-link" :to="{ name: 'auth:find-password' }" />
    </div>

    <Button label="로그인" type="submit" />
  </form>
</template>

<script setup>
import { useToast } from 'primevue';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import AppCheck from '@/components/common/form/AppCheck.vue';
import { useUserStore } from '@/stores/user';
import AuthApiService from '@/utils/api/AuthApiService';
import LocalStorageUtil from '@/utils/localStorage';

const userStore = useUserStore();
const router = useRouter();
const toast = useToast();

const id = ref('');
const password = ref('');
const saveAuth = ref(false);

const authApiService = new AuthApiService();
const localStorageUtil = new LocalStorageUtil();

const checkForm = () => {
  try {
    if (!id.value) throw new Error('아이디를 입력해주세요.');
    if (!password.value) throw new Error('비밀번호를 입력해주세요.');
  } catch (e) {
    toast.add({ severity: 'error', summary: '입력 확인', detail: e.message, life: 3000 });
    return false;
  }

  return true;
};

const login = () => {
  const isPass = checkForm();
  if (!isPass) return;

  authApiService.login(id.value, password.value).then(() => {
    // 로그인 후 access token, refresh token 셋팅 완료

    // 로그인 한 사람의 권한 조회
    authApiService.getAuth().then(data => {
      console.log(data);
    });
  });

  // if (type === 'hq') {
  //   userStore.loginByHeadQuarter();
  // } else if (type === 'fc') {
  //   userStore.loginByFranchise();
  // } else if (type === 'd') {
  //   userStore.loginByDelivery();
  // }

  // // 로그인 정보 저장할건지?
  // localStorageUtil.handleRememberLoginId(saveAuth.value, id.value);

  // router.replace({ name: `${type}:home` });
};

onMounted(() => {
  // 저장된 로그인 아이디가 있다면 default 셋팅
  const foundLoginId = localStorageUtil.getLoginId();
  if (foundLoginId) {
    id.value = foundLoginId;
  }
});
</script>

<style scoped>
.login-container {
  width: 350px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 16px;

  .input {
    text-align: center;
  }

  .middle {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
