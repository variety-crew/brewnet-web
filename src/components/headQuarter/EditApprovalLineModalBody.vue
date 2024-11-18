<template>
  <AppModalBody action-button-label="저장" :disabled-action-button="!position" @click-action-button="save">
    <AppSelect v-model="position" label="직급" :options="positionOptions" :initial-value="initialPosition" />
  </AppModalBody>
</template>

<script setup>
import { computed, inject, onMounted, ref } from 'vue';

import { POSITIONS } from '@/utils/constant';
import { formatKoEmployeePosition } from '@/utils/format';
import { makeSelectOption } from '@/utils/helper';

import AppModalBody from '../common/AppModalBody.vue';
import AppSelect from '../common/form/AppSelect.vue';

const dialogRef = inject('dialogRef');

const position = ref('');
const initialPosition = ref('');

let approvalLine = null;

const positionOptions = computed(() => {
  return POSITIONS.map(e => makeSelectOption(formatKoEmployeePosition(e), e));
});

const save = () => {
  console.log(approvalLine.code, position.value, '으로 수정');
};

onMounted(() => {
  const { targetApprovalLine } = dialogRef.value.data;
  approvalLine = targetApprovalLine;

  // 현재 설정된 결재라인이 있다면
  if (targetApprovalLine.positions.length > 0) {
    initialPosition.value = targetApprovalLine.positions[0];
  }
});
</script>

<style scoped></style>
