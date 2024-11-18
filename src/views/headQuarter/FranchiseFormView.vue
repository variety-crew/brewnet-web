<template>
  <form class="franchise-form-container" @submit.prevent="onSubmit">
    <AppInputText v-model="franchiseName" label="지점명" />

    <!-- 주소 검색 -->
    <div>
      <AppInputText
        v-model="address"
        label="주소"
        placeholder="주소검색"
        read-only
        class="mb-2"
        icon="pi pi-search"
        full-width
        icon-position="end"
        @on-click="onClickSearchAddress"
      />
      <AppInputText v-model="addressDetail" placeholder="상세주소 입력" />
    </div>

    <AppInputText v-model="contact" label="가맹점 연락처" />

    <Button type="submit" label="저장" size="small" />
  </form>
</template>

<script setup>
import { useToast } from 'primevue';
import { defineAsyncComponent, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

import AppInputText from '@/components/common/form/AppInputText.vue';
import { useModal } from '@/hooks/useModal';
import { mockupFranchises } from '@/utils/mockup';

const SearchAddressModalBody = defineAsyncComponent(
  () => import('@/components/headQuarter/SearchAddressModalBody.vue'),
);

const toast = useToast();
const { openModal } = useModal();
const route = useRoute();

const franchiseName = ref('');
const address = ref('');
const addressDetail = ref('');
const contact = ref('');
const editMode = ref(false);

const onClickSearchAddress = () => {
  openModal({ component: SearchAddressModalBody, header: '주소 검색' });
};

const checkForm = () => {
  try {
    if (!franchiseName.value) throw new Error('지점명을 입력해주세요.');
    if (!address.value) throw new Error('주소검색을 통해 가맹점 주소를 입력해주세요.');
    if (!contact.value) throw new Error('가맹점 연락처를 입력해주세요.');

    return true;
  } catch (e) {
    toast.add({ severity: 'error', summary: '입력 확인', detail: e.message, life: 3000 });
    return false;
  }
};

const onSubmit = () => {
  const isPass = checkForm();
};

watch(
  () => route.params.franchiseCode,
  newVal => {
    // 수정모드인 경우 기본 값 설정
    if (newVal) {
      editMode.value = true;

      const foundFranchise = mockupFranchises.find(e => e.code == newVal);
      if (!foundFranchise) return;

      franchiseName.value = foundFranchise.franchiseName;
      address.value = foundFranchise.address;
      addressDetail.value = foundFranchise.address;
      contact.value = foundFranchise.contact;
    } else {
      // 생성모드는 값 초기화
      editMode.value = false;

      franchiseName.value = '';
      address.value = '';
      addressDetail.value = '';
      contact.value = '';
    }
  },
  { immediate: true },
);
</script>

<style scoped>
.franchise-form-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 300px;
}
</style>
