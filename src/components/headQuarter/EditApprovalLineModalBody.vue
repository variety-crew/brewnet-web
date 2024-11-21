<template>
  <AppModalBody action-button-label="저장" :disabled-action-button="!position" @click-action-button="save">
    <AppSelect v-model="position" label="직급" :options="positionOptions" :initial-value="initialPosition" />
  </AppModalBody>
</template>

<script setup>
import { computed, inject, onMounted, ref } from 'vue';

import DocumentApi from '@/utils/api/DocumentApi';
import { APPROVAL_POSITIONS } from '@/utils/constant';
import DOMEvent from '@/utils/domEvent';
import { formatKoEmployeePosition } from '@/utils/format';
import { makeSelectOption } from '@/utils/helper';

import AppModalBody from '../common/AppModalBody.vue';
import AppSelect from '../common/form/AppSelect.vue';

const dialogRef = inject('dialogRef');

const position = ref('');
const initialPosition = ref('');
const positionOptions = computed(() => {
  return APPROVAL_POSITIONS.map(e => makeSelectOption(formatKoEmployeePosition(e), formatKoEmployeePosition(e)));
});

let approvalLine = null;
const documentApi = new DocumentApi();

const save = () => {
  if (!approvalLine) return;

  documentApi.setApprovalLine({ ...approvalLine, positionName: position.value }).then(() => {
    DOMEvent.dispatchApiSuccess('결재라인이 수정되었습니다.');
    dialogRef.value.close();
  });
};

onMounted(() => {
  const { targetApprovalLine } = dialogRef.value.data;
  approvalLine = targetApprovalLine;

  // 현재 설정된 결재라인이 있다면
  if (targetApprovalLine.positionName) {
    initialPosition.value = targetApprovalLine.positionName;
    position.value = targetApprovalLine.positionName;
  }
});
</script>

<style scoped></style>
