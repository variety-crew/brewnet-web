<template>
  <AppFormContainer @on-submit="onFormSubmit">
    <!-- 아이디 -->
    <AppInputText v-if="!editMode" v-model="loginId" label="아이디" />
    <AppLabelText v-else label="아이디" :text="loginId" />

    <!-- 비밀번호 -->
    <div>
      <AppInputPassword v-model="password" label="비밀번호" class="mb-2" />
      <AppInputPassword v-model="confirmPassword" />
    </div>

    <!-- 성명 -->
    <AppInputText v-model="username" label="성명" />

    <!-- 이메일 -->
    <AppInputText v-model="email" label="이메일" />

    <!-- 휴대폰번호 -->
    <AppInputText v-model="phone" label="휴대폰번호" />

    <!-- 직급 -->
    <AppSelect v-model="position" label="직급" :options="positionOptions" :initial-value="initialPosition" />
  </AppFormContainer>
</template>

<script setup>
import { useToast } from 'primevue/usetoast';
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

import AppLabelText from '@/components/common/AppLabelText.vue';
import AppFormContainer from '@/components/common/form/AppFormContainer.vue';
import AppInputPassword from '@/components/common/form/AppInputPassword.vue';
import AppInputText from '@/components/common/form/AppInputText.vue';
import AppSelect from '@/components/common/form/AppSelect.vue';
import { POSITIONS } from '@/utils/constant';
import { formatKoEmployeePosition } from '@/utils/format';
import { makeSelectOption } from '@/utils/helper';
import { mockupEmployees } from '@/utils/mockup';
import { emailRegex, loginIdRegex, passwordRegex } from '@/utils/regex';

const route = useRoute();
const toast = useToast();

const loginId = ref('');
const password = ref('');
const confirmPassword = ref('');
const username = ref('');
const email = ref('');
const phone = ref('');
const position = ref('');
const initialPosition = ref('');
const editMode = ref(false);

const positionOptions = computed(() => {
  return POSITIONS.map(e => makeSelectOption(formatKoEmployeePosition(e), e));
});

const checkForm = () => {
  try {
    if (!loginId.value) throw new Error('아이디를 입력해주세요');
    if (!loginIdRegex.test(loginId.value)) throw new Error('아이디는 영문, 숫자만 가능합니다.');

    if (!password.value) throw new Error('비밀번호를 입력해주세요.');

    if (!confirmPassword.value) throw new Error('비밀번호를 재입력해주세요.');
    if (confirmPassword.value !== password.value) throw new Error('비밀번호가 일치하지 않습니다.');

    if (!username.value) throw new Error('성명을 입력해주세요.');

    if (!email.value) throw new Error('이메일을 입력해주세요.');
    if (!emailRegex.test(email.value)) throw new Error('이메일 형식으로 입력해주세요.');

    if (!phone.value) throw new Error('휴대폰번호를 입력해주세요.');

    if (!position.value) throw new Error('직급을 선택해주세요');

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

watch(
  () => route.params.memberId,
  newVal => {
    // 수정모드인 경우 기본 값 설정
    if (newVal) {
      editMode.value = true;

      const foundEmployee = mockupEmployees.find(e => e.code == route.params.memberId);
      if (!foundEmployee) return;

      loginId.value = foundEmployee.id;
      username.value = foundEmployee.name;
      email.value = foundEmployee.email;
      phone.value = foundEmployee.contact;
      position.value = foundEmployee.position;
      initialPosition.value = foundEmployee.position; // Select의 default 값은 따로 설정
    } else {
      // 생성모드는 값 초기화
      editMode.value = false;

      loginId.value = '';
      username.value = '';
      email.value = '';
      phone.value = '';
      position.value = '';
      initialPosition.value = '';
    }
  },
  { immediate: true },
);
</script>

<style scoped></style>
