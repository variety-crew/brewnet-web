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

    <Button label="본사 로그인" @click="clickLoginByHeadQuarter" />
    <Button label="가맹점 로그인" @click="clickLoginByFranchise" />
    <Button label="배송기사 로그인" @click="clickLoginByDelivery" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import AppCheck from '@/components/common/form/AppCheck.vue';
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();
const router = useRouter();

const id = ref('');
const password = ref('');
const saveAuth = ref(false);

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
