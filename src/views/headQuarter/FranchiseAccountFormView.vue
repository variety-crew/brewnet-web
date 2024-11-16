<template>
  <AppFormContainer @on-submit="onFormSubmit">
    <!-- 아이디 -->
    <AppInputText v-model="loginId" label="아이디" name="loginId" />

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
    </AppFormField>

    <Button type="submit" variant="outlined" label="저장" />
  </AppFormContainer>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

import AppFormContainer from '@/components/common/form/AppFormContainer.vue';
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

const selectedFranchise = ref(null);
const filteredFranchises = ref([]);
const franchiseSuggestions = computed(() => {
  return filteredFranchises.value.map(e => ({ label: e.franchiseName, code: e.code }));
});

const onFormSubmit = () => {
  console.log('통과');
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
