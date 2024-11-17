<template>
  <div class="login-container">
    <div class="brand">
      <img src="@/assets/images/logo_no_bg.png" alt="" />
      <p class="desc">카페 물류 주문관리 시스템</p>
    </div>

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
      <Button label="비밀번호 찾기" variant="text" size="small" />
    </div>

    <Button label="본사 로그인" @click="clickLogin('hq')" />
    <Button label="가맹점 로그인" @click="clickLogin('fc')" />
    <Button label="배송기사 로그인" @click="clickLogin('d')" />
  </div>
</template>

<script setup>
import { useToast } from 'primevue';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import AppCheck from '@/components/common/form/AppCheck.vue';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
const router = useRouter();
const toast = useToast();

const id = ref('');
const password = ref('');
const saveAuth = ref(false);

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

const clickLogin = type => {
  const isPass = checkForm();
  if (!isPass) return;

  if (type === 'hq') {
    userStore.loginByHeadQuarter();
  } else if (type === 'fc') {
    userStore.loginByFranchise();
  } else if (type === 'd') {
    userStore.loginByDelivery();
  }

  // 로그인 정보 저장할건지?
  if (saveAuth.value) {
    localStorage.setItem('loginId', id.value);
  } else {
    localStorage.removeItem('loginId');
  }

  router.replace({ name: `${type}:home` });
};

onMounted(() => {
  // 저장된 로그인 아이디가 있다면 default 셋팅
  const foundLoginId = localStorage.getItem('loginId');
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

  .brand {
    margin-bottom: 70px;
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      margin-bottom: 10px;
    }

    .desc {
      text-align: center;
      color: var(--p-inputtext-placeholder-color);
    }
  }

  .middle {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
