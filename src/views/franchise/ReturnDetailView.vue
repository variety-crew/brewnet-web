<template>
  <div class="return-detail-container">
    <div class="status-history">
      <div v-for="(step, i) in statusStepList" :key="i" class="status-item">
        <div class="dot" :class="{ active: step.active }"></div>
        <p class="title" :class="{ active: step.active }">
          {{ formatKoReturnStatus(step.status) }}
        </p>
        <p class="date" :class="{ active: step.active }">{{ step.processedAt }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import FCReturnApi from '@/utils/api/FCReturnApi';
import { RETURN_STEP_LIST } from '@/utils/constant';
import { formatKoReturnStatus } from '@/utils/format';

const route = useRoute();
const { returnCode } = route.params;

const returnDetail = ref(null);
const statusHistory = ref([]);
const statusStepList = computed(() => {
  return RETURN_STEP_LIST.reduce((acc, current) => {
    const match = statusHistory.value.find(e => e.status === current);
    acc.push({ status: current, active: match !== undefined, processedAt: match?.processedAt || null });

    return acc;
  }, []);
});

const fcReturnApi = new FCReturnApi();

const getPageData = () => {
  // 반품 상세정보
  fcReturnApi.getReturnDetail(returnCode).then(data => {
    returnDetail.value = data;
  });

  // 반품 상태변경 이력
  fcReturnApi.getReturnStatusHistory(returnCode).then(data => {
    statusHistory.value = data;
  });
};

onMounted(() => {
  getPageData();
});
</script>

<style scoped>
.return-detail-container {
  .status-history {
    padding: 16px;
    border-radius: 5px;
    border: 1px solid var(--p-surface-300);
    box-shadow: var(--p-primary-100) 0px 2px 8px 0px;
    display: flex;
    justify-content: space-between;
  }

  .status-item {
    display: flex;
    flex-direction: column;
    align-items: center;

    .dot {
      background-color: var(--p-surface-400);
      width: 14px;
      height: 14px;
      border-radius: 50%;
      border: 3px solid white;

      &.active {
        background-color: var(--p-primary-700);
      }
    }

    .title {
      color: var(--p-surface-400);

      &.active {
        color: var(--p-primary-700);
      }
    }

    .date {
      visibility: hidden;
      color: var(--p-primary-700);
      font-size: 12px;

      &.active {
        visibility: visible;
      }
    }
  }
}
</style>
