<template>
  <div class="approval-line-container">
    <table>
      <tr v-for="approvalLine in approvalLines" :key="approvalLine.code">
        <th>{{ approvalLine.title }}</th>
        <td>
          <p v-for="(position, i) in approvalLine.positions" :key="position">
            {{ i + 1 }}차 결재자: {{ formatKoEmployeePosition(position) }}
          </p>
        </td>
        <td>
          <Button label="수정" size="small" @click="clickEdit(approvalLine)" />
        </td>
      </tr>
    </table>

    <DynamicDialog />
  </div>
</template>

<script setup>
import { defineAsyncComponent, onMounted, ref } from 'vue';

import { useModal } from '@/hooks/useModal';
import { formatKoEmployeePosition } from '@/utils/format';
import { mockupApprovalLines } from '@/utils/mockup';

const EditApprovalLineModalBody = defineAsyncComponent(
  () => import('@/components/headQuarter/EditApprovalLineModalBody.vue'),
);

const { openModal } = useModal();

const approvalLines = ref([]);

let editingCode = null;

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
  approvalLines.value = [...mockupApprovalLines];
});
</script>

<style scoped>
.approval-line-container {
  table {
    width: 100%;
    margin-top: 20px;
    border-spacing: 0;
    border-collapse: collapse;

    th {
      background-color: var(--p-surface-100);
    }

    th,
    td {
      padding: 5px 10px;
      border: 1px solid var(--p-surface-200);
    }

    tr > td:nth-child(3) {
      text-align: center;
    }
  }
}
</style>
