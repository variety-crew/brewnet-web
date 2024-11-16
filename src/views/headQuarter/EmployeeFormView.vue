<template>
  <AppFormContainer @on-submit="onFormSubmit">
    <!-- 아이디 -->
    <AppInputText v-model="loginId" label="아이디" name="loginId" />

    <!-- 비밀번호 -->
    <div>
      <AppInputPassword v-model="password" label="비밀번호" name="password" class="mb-2" />
      <AppInputPassword v-model="confirmPassword" name="confirmPassword" />
    </div>

    <!-- 성명 -->
    <AppInputText v-model="username" label="성명" name="username" />

    <!-- 이메일 -->
    <AppInputText v-model="email" label="이메일" name="email" />

    <!-- 휴대폰번호 -->
    <AppInputText v-model="phone" label="휴대폰번호" name="phone" />

    <!-- 직급 -->
    <AppSelect
      v-model="position"
      label="직급"
      name="position"
      :options="positionOptions"
      :initial-value="initialPosition"
    />
  </AppFormContainer>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

import AppFormContainer from '@/components/common/form/AppFormContainer.vue';
import AppInputPassword from '@/components/common/form/AppInputPassword.vue';
import AppInputText from '@/components/common/form/AppInputText.vue';
import AppSelect from '@/components/common/form/AppSelect.vue';
import { POSITIONS } from '@/utils/constant';
import { formatKoEmployeePosition } from '@/utils/format';
import { makeSelectOption } from '@/utils/helper';
import { mockupEmployees } from '@/utils/mockup';
import { emailRegex, loginIdRegex, passwordRegex } from '@/utils/regex';

const {
  params: { memberId },
} = useRoute();

const loginId = ref('');
const password = ref('');
const confirmPassword = ref('');
const username = ref('');
const email = ref('');
const phone = ref('');
const position = ref('');
const initialPosition = ref('');

const positionOptions = computed(() => {
  return POSITIONS.map(e => makeSelectOption(formatKoEmployeePosition(e), e));
});

const checkForm = () => {
  if (!loginId.value) return false; // 아이디를 입력해주세요.
  if (!loginIdRegex.test(loginId.value)) return false; // 아이디는 영문, 숫자만 가능합니다.

  if (!password.value) return false; // 비밀번호를 입력해주세요.

  if (!confirmPassword.value) return false; // 비밀번호를 재입력해주세요.
  if (confirmPassword.value !== password.value) return false; // 비밀번호가 일치하지 않습니다.

  if (!username.value) return false; // 성명을 입력해주세요.

  if (!email.value) return false; // 이메일을 입력해주세요.
  if (!emailRegex.test(email.value)) return false; // 이메일 형식으로 입력해주세요.

  if (!phone.value) return false; // 휴대폰번호를 입력해주세요.

  if (!position.value) return false; // 직급을 선택해주세요

  return true;
};

const onFormSubmit = () => {
  const isPass = checkForm();
  if (isPass) {
    console.log('통과');
  }
};

onMounted(() => {
  const foundEmployee = mockupEmployees.find(e => e.code == memberId);
  if (!foundEmployee) return;

  // 수정모드인 경우 기본 값 설정
  loginId.value = foundEmployee.id;
  username.value = foundEmployee.name;
  email.value = foundEmployee.email;
  phone.value = foundEmployee.contact;
  position.value = foundEmployee.position;
  initialPosition.value = foundEmployee.position; // Select의 default 값은 따로 설정
});
</script>

<style scoped></style>
