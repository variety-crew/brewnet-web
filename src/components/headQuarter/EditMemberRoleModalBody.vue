<template>
  <AppModalBody action-button-label="저장" @click-action-button="clickSave">
    <p>[{{ memberName }}] 임직원의 권한을 변경합니다.</p>
  </AppModalBody>
</template>

<script setup>
import { inject, onMounted, ref } from 'vue';

import AppModalBody from '../common/AppModalBody.vue';

let memberCode = 0;

const dialogRef = inject('dialogRef');
const memberName = ref('');

const clickSave = () => {
  console.log(memberCode, '권한 저장');

  dialogRef.value.close();
};

onMounted(() => {
  const { member } = dialogRef.value.data;
  memberCode = member.code;
  memberName.value = member.name;
});
</script>

<style scoped></style>
