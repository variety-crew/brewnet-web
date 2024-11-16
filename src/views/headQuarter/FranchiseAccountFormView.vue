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

    <!-- 이메일 -->
    <AppInputText v-model="email" label="이메일" name="email" :form-slot="$form" />

    <!-- 휴대폰번호 -->
    <AppInputText v-model="phone" label="휴대폰번호" name="phone" :form-slot="$form" />

    <!-- 담당 가맹점 -->
    <AppFormField label="가맹점">
      <AutoComplete
        v-model="selectedFranchise"
        option-label="label"
        :suggestions="franchiseSuggestions"
        size="small"
        complete-on-focus
        name="franchise"
        @complete="search"
      >
        <template #option="slotProps">
          <div>{{ slotProps.option.label }}</div>
        </template>
        <template #footer>
          <div class="px-3 py-3">
            <Button
              label="가맹점 신규 등록"
              fluid
              severity="secondary"
              text
              size="small"
              icon="pi pi-plus"
              @click="clickAddFranchise"
            />
          </div>
        </template>
      </AutoComplete>
      <Message v-if="$form && $form.franchise?.invalid" severity="error" size="small" variant="simple">{{
        $form.franchise.error?.message
      }}</Message>
    </AppFormField>

    <Button type="submit" variant="outlined" label="저장" />
  </Form>
</template>

<script setup>
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { z } from 'zod';

import AppFormField from '@/components/common/form/AppFormField.vue';
import AppInputPassword from '@/components/common/form/AppInputPassword.vue';
import AppInputText from '@/components/common/form/AppInputText.vue';
import { mockupFranchises } from '@/utils/mockup';
import { loginIdRegex } from '@/utils/regex';

const router = useRouter();

const loginId = ref('');
const password = ref('');
const confirmPassword = ref('');
const email = ref('');
const phone = ref('');

const initialValues = ref({
  loginId: '',
  password: '',
  confirmPassword: '',
  email: '',
  phone: '',
  franchise: { label: '' },
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

        email: z
          .string()
          .min(1, { message: '이메일을 입력해주세요.' })
          .email({ message: '이메일 형식으로 입력해주세요.' }),

        phone: z.string().min(1, { message: '휴대폰번호를 입력해주세요.' }),

        franchise: z.union([
          z.object({
            label: z.string().min(1, { message: '가맹점을 선택해주세요.' }),
          }),
          z.string().refine(val => false, { message: '가맹점을 선택해주세요.' }), // 옵션에 없는 다른 것을 입력했을 때
        ]),
      })
      .refine(data => data.password === data.confirmPassword, {
        message: '비밀번호가 일치하지 않습니다.',
        path: ['confirmPassword'],
      }),
  ),
);

const selectedFranchise = ref(null);
const filteredFranchises = ref([]);
const franchiseSuggestions = computed(() => {
  return filteredFranchises.value.map(e => ({ label: e.franchiseName, code: e.code }));
});

const onFormSubmit = ({ valid }) => {
  if (valid) {
    console.log('통과');
  }
};

const search = event => {
  console.log(event.query);
  // 가맹점 검색
  filteredFranchises.value = [...mockupFranchises];
};

const clickAddFranchise = () => {
  const fullPath = router.resolve({ name: 'hq:partner:franchise:create' }).href;
  window.open(fullPath, '_blank');
};
</script>

<style scoped></style>
