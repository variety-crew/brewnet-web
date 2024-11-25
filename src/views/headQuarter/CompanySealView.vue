<template>
  <div class="company-seal-container">
    <img v-if="sealImageUrl" :src="sealImageUrl" alt="법인인감 이미지" />
    <EmptyContent v-else text="등록된 법인인감이 없습니다." fallback-label="등록하기" @fallback="goUpload" />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import EmptyContent from '@/components/common/EmptyContent.vue';

const router = useRouter();

const sealImageUrl = ref('');

const goUpload = () => {
  router.push({ name: 'hq:settings:company-seal:upload' });
};

onMounted(() => {
  // 인감 이미지 가져오기
});
</script>

<style scoped></style>
