<template>
  <div class="approval-line-container">
    <AppTableStyled full-width>
      <tr v-for="approvalLine in approvalLines" :key="approvalLine.kind">
        <th>{{ formatKoApprovalKind(approvalLine.kind) }} 결재라인</th>
        <td>
          <p>결재자(직급): {{ approvalLine.positionName }}</p>
        </td>
        <td>
          <Button label="수정" size="small" @click="clickEdit(approvalLine)" />
        </td>
      </tr>
    </AppTableStyled>

    <DynamicDialog />
  </div>
</template>

<script setup>
import { defineAsyncComponent, onMounted, ref } from 'vue';

import AppTableStyled from '@/components/common/AppTableStyled.vue';
import { useModal } from '@/hooks/useModal';
import DocumentApi from '@/utils/api/DocumentApi';
import { formatKoApprovalKind } from '@/utils/format';

const EditApprovalLineModalBody = defineAsyncComponent(
  () => import('@/components/headQuarter/EditApprovalLineModalBody.vue'),
);

const { openModal } = useModal();

const approvalLines = ref([]);

let editingCode = null;
const documentApi = new DocumentApi();

const clickEdit = target => {
  editingCode = target.code;
  openModal({
    component: EditApprovalLineModalBody,
    header: `${target.title} 수정`,
    data: {
      targetApprovalLine: target,
    },
  });
};

onMounted(() => {
  documentApi.getApproval().then(data => {
    approvalLines.value = data;
  });
});
</script>

<style scoped>
.approval-line-container {
  table {
    margin-top: 20px;

    tr > td:nth-child(3) {
      text-align: center;
    }
  }
}
</style>
