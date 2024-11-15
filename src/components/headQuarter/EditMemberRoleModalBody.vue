<template>
  <AppModalBody action-button-label="저장" @click-action-button="clickSave">
    <template v-if="currentMember">
      <p class="mb-3">[{{ currentMember.name }}] 임직원의 권한을 변경합니다.</p>
      <AppSelect v-model="selectedRole" :options="roleOptions" :initial-value="initialRole" />
    </template>
  </AppModalBody>
</template>

<script setup>
import { computed, inject, onMounted, ref } from 'vue';

import AppModalBody from '@/components/common/AppModalBody.vue';
import AppSelect from '@/components/common/form/AppSelect.vue';
import { HEAD_QUARTER_ROLES } from '@/utils/constant';
import { formatKoMemberRole } from '@/utils/format';

const dialogRef = inject('dialogRef');
const currentMember = ref(null);
const selectedRole = ref('');
const initialRole = computed(() => {
  return currentMember.value?.role || '';
});
const roleOptions = computed(() => {
  const headQuarterRoleOptions = HEAD_QUARTER_ROLES.map(e => ({
    value: e,
    label: formatKoMemberRole(e),
  }));

  // 현재 권한이 있는 경우에만 "권한 없음" 옵션 표시
  if (currentMember.value?.role) {
    return headQuarterRoleOptions.concat({ value: 'null', label: '권한 없음' });
  }

  return headQuarterRoleOptions;
});

const clickSave = () => {
  console.log(currentMember.value?.code, '권한 저장');

  dialogRef.value.close();
};

onMounted(() => {
  // 현재 member 권한 가져오기
  const { member } = dialogRef.value.data;
  currentMember.value = member;
});
</script>

<style scoped></style>
