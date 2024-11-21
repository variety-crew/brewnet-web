<template>
  <form class="franchise-account-form-container" @submit.prevent="onFormSubmit">
    <!-- 아이디 -->
    <AppInputText v-if="!editMode" v-model="loginId" label="아이디" name="loginId" />
    <AppLabelText v-else label="아이디" :text="loginId" />

    <!-- 비밀번호 -->
    <div>
      <AppInputPassword v-model="password" label="비밀번호" name="password" class="mb-2" />
      <AppInputPassword v-model="confirmPassword" name="confirmPassword" />
    </div>

    <!-- 이메일 -->
    <AppInputText v-model="email" label="이메일" name="email" />

    <!-- 휴대폰번호 -->
    <AppInputText v-model="phone" label="휴대폰번호" name="phone" />

    <!-- 담당 가맹점 -->
    <AppAutoComplete
      v-model="selectedFranchise"
      label="가맹점"
      :suggestions="franchiseSuggestions"
      full-width
      @complete-input="search"
    >
      <template #footer>
        <Button
          label="가맹점 신규 등록"
          fluid
          severity="secondary"
          text
          size="small"
          icon="pi pi-plus"
          @click="clickAddFranchise"
        />
      </template>
    </AppAutoComplete>

    <Button type="submit" variant="outlined" label="저장" />
  </form>
</template>

<script setup>
import { useToast } from 'primevue';
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import AppLabelText from '@/components/common/AppLabelText.vue';
import AppAutoComplete from '@/components/common/form/AppAutoComplete.vue';
import AppInputPassword from '@/components/common/form/AppInputPassword.vue';
import AppInputText from '@/components/common/form/AppInputText.vue';
import { makeAutocompleteSuggestion } from '@/utils/helper';
import { mockupFranchiseAccounts, mockupFranchises } from '@/utils/mockup';
import { emailRegex, loginIdRegex } from '@/utils/regex';

const router = useRouter();
const route = useRoute();
const toast = useToast();

const loginId = ref('');
const password = ref('');
const confirmPassword = ref('');
const email = ref('');
const phone = ref('');
const selectedFranchise = ref(null);
const filteredFranchises = ref([]);
const editMode = ref(false);

const franchiseSuggestions = computed(() => {
  return filteredFranchises.value.map(e => makeAutocompleteSuggestion(e.code, e.franchiseName));
});

const checkForm = () => {
  emailRegex.lastIndex = 0;
  loginIdRegex.lastIndex = 0;

  try {
    if (!editMode.value) {
      if (!loginId.value) throw new Error('아이디를 입력해주세요');
      if (!loginIdRegex.test(loginId.value)) throw new Error('아이디는 영문, 숫자만 가능합니다.');

      if (!password.value) throw new Error('비밀번호를 입력해주세요.');

      if (!confirmPassword.value) throw new Error('비밀번호를 재입력해주세요.');
      if (confirmPassword.value !== password.value) throw new Error('비밀번호가 일치하지 않습니다.');
    }

    if (!email.value) throw new Error('이메일을 입력해주세요.');
    if (!emailRegex.test(email.value)) throw new Error('이메일 형식으로 입력해주세요.');

    if (!phone.value) throw new Error('휴대폰번호를 입력해주세요.');

    if (!selectedFranchise.value) throw new Error('가맹점을 선택해주세요');

    return true;
  } catch (e) {
    toast.add({ severity: 'error', summary: '입력 확인', detail: e.message, life: 3000 });

    return false;
  }
};

const onFormSubmit = () => {
  const isPass = checkForm();
  if (isPass) {
    console.log('통과');
  }
};

const search = event => {
  console.log('auto complete 검색할 keyword:', event.query);
  // 가맹점 검색
  filteredFranchises.value = [...mockupFranchises];
};

const clickAddFranchise = () => {
  const fullPath = router.resolve({ name: 'hq:partner:franchise:create' }).href;
  window.open(fullPath, '_blank');
};

watch(
  () => route.params.memberCode,
  newVal => {
    // 수정모드인 경우 기본 값 설정
    if (newVal) {
      editMode.value = true;

      const foundEmployee = mockupFranchiseAccounts.find(e => e.code == route.params.memberCode);
      if (!foundEmployee) return;

      loginId.value = foundEmployee.id;
      email.value = foundEmployee.email;
      phone.value = foundEmployee.contact;
      selectedFranchise.value = { label: foundEmployee.franchiseName, code: 500 };
    } else {
      // 생성모드는 값 초기화
      editMode.value = false;

      loginId.value = '';
      email.value = '';
      phone.value = '';
      selectedFranchise.value = null;
    }
  },
  { immediate: true },
);
</script>

<style scoped>
.franchise-account-form-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: fit-content;
}
</style>
