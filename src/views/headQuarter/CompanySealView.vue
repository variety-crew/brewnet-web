<template>
  <div class="company-seal-container">
    <img v-if="sealImageUrl" :src="sealImageUrl" alt="법인인감 이미지" />
    <div v-else class="empty">
      <i class="pi pi-times-circle"></i>
      <p>등록된 법인인감이 없습니다.</p>
      <Button size="small" label="등록하기" as="router-link" :to="{ name: 'hq:settings:company-seal:upload' }" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const sealImageUrl = ref('');

onMounted(() => {
  // 인감 이미지 가져오기
});
</script>

<style scoped>
.company-seal-container {
  .empty {
    border-radius: 5px;
    border: 1px solid var(--p-content-border-color);
    padding: 32px 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: center;

    i {
      font-size: 50px;
      color: var(--p-surface-500);
    }

    p {
      color: var(--p-surface-700);
    }
  }
}
</style>
