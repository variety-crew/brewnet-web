<template>
  <AppModalBody action-button-label="저장" @click-action-button="clickSave">
    <template v-if="currentMember">
      <p class="mb-3">[{{ currentMember.name }}] 임직원의 권한을 변경합니다.</p>
      <Select
        v-model="selectedRole"
        :options="roleOptions"
        option-label="name"
        placeholder="===선택해주세요==="
        checkmark
        :highlight-on-select="false"
        size="small"
      />
    </template>
  </AppModalBody>
</template>

<script setup>
import { computed, inject, onMounted, ref } from 'vue';

import { HEAD_QUARTER_ROLES } from '@/utils/constant';
import { formatKoMemberRole } from '@/utils/format';

import AppModalBody from '../common/AppModalBody.vue';

let memberCode = 0;

const dialogRef = inject('dialogRef');
const currentMember = ref(null);
const selectedRole = ref(null);
const roleOptions = computed(() => {
  const headQuarterRoleOptions = HEAD_QUARTER_ROLES.map(e => ({
    key: e,
    name: formatKoMemberRole(e),
  }));

  // 현재 권한이 있는 경우에만 "권한 없음" 옵션 표시
  if (currentMember.value?.role) {
    return headQuarterRoleOptions.concat({ key: 'null', name: '권한 없음' });
  }

  return headQuarterRoleOptions;
});

const clickSave = () => {
  console.log(memberCode, '권한 저장');

  dialogRef.value.close();
};

onMounted(() => {
  const { member } = dialogRef.value.data;
  currentMember.value = member;

  // 현재 권한을 default selected 값으로 설정
  if (member.role) {
    selectedRole.value = { key: member.role, name: formatKoMemberRole(member.role) };
  }
});
</script>

<style scoped></style>
