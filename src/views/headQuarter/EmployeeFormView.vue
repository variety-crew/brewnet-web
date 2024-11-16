<template>
  <Form
    v-slot="$form"
    :initial-values="initialValues"
    :resolver="resolver"
    class="form-container-v"
    @submit="onFormSubmit"
  >
    <!-- 아이디 -->
    <AppInputText v-model="loginId" label="아이디" name="loginId" :form-slot="$form" />

    <!-- 비밀번호 -->
    <div>
      <AppInputPassword v-model="password" label="비밀번호" name="password" :form-slot="$form" class="mb-2" />
      <AppInputPassword v-model="confirmPassword" name="confirmPassword" :form-slot="$form" />
    </div>

    <!-- 성명 -->
    <AppInputText v-model="username" label="성명" name="username" :form-slot="$form" />

    <!-- 이메일 -->
    <AppInputText v-model="email" label="이메일" name="email" :form-slot="$form" />

    <!-- 휴대폰번호 -->
    <AppInputText v-model="phone" label="휴대폰번호" name="phone" :form-slot="$form" />

    <!-- 직급 -->
    <AppSelect v-model="position" label="직급" name="position" :options="positionOptions" :form-slot="$form" />

    <Button type="submit" variant="outlined" label="저장" />
  </Form>
</template>

<script setup>
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { computed, ref, watch } from 'vue';
import { z } from 'zod';

import AppInputPassword from '@/components/common/form/AppInputPassword.vue';
import AppInputText from '@/components/common/form/AppInputText.vue';
import AppSelect from '@/components/common/form/AppSelect.vue';
import { POSITIONS } from '@/utils/constant';
import { formatKoEmployeePosition } from '@/utils/format';
import { makeSelectOption } from '@/utils/helper';
import { loginIdRegex, passwordRegex } from '@/utils/regex';

const loginId = ref('');
const password = ref('');
const confirmPassword = ref('');
const username = ref('');
const email = ref('');
const phone = ref('');
const position = ref('');

const initialValues = ref({
  loginId: '',
  password: '',
  confirmPassword: '',
  username: '',
  email: '',
  phone: '',
  position: '',
});

const resolver = ref(
  zodResolver(
    z
      .object({
        loginId: z
          .string()
          .min(1, { message: '아이디를 입력해주세요.' })
          .regex(loginIdRegex, { message: '아이디는 영문, 숫자만 가능합니다.' }),

        password: z.string().min(1, { message: '비밀번호를 입력해주세요.' }),
        // .regex(passwordRegex, { message: '8자 이상 입력해주세요. (영문,숫자,특수문자 !@#$%^&* 가능)' })

        confirmPassword: z.string().min(1, { message: '비밀번호를 재입력해주세요' }),

        username: z.string().min(1, { message: '성명을 입력해주세요' }),

        email: z
          .string()
          .min(1, { message: '이메일을 입력해주세요.' })
          .email({ message: '이메일 형식으로 입력해주세요.' }),

        phone: z.string().min(1, { message: '휴대폰번호를 입력해주세요.' }),

        position: z.string().min(1, '직급을 선택해주세요.'),
      })
      .refine(data => data.password === data.confirmPassword, {
        message: '비밀번호가 일치하지 않습니다.',
        path: ['confirmPassword'],
      }),
  ),
);

const positionOptions = computed(() => {
  return POSITIONS.map(e => makeSelectOption(formatKoEmployeePosition(e), e));
});

const onFormSubmit = ({ valid }) => {
  if (valid) {
    console.log('통과');
  }
};
</script>

<style scoped></style>
