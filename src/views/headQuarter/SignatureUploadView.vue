<template>
  <AuthorizationRequiredArea v-model="isAuthorized">
    <div class="signature-upload-container">
      <Button size="small" label="파일 선택" variant="outlined" severity="secondary" @click="clickChoose" />
      <input ref="inputRef" type="file" accept="image/*" style="display: none" @change="changeFile" />

      <div v-if="previewUrl" class="uploaded-area">
        <img v-if="previewUrl" :src="previewUrl" alt="업로드 된 이미지" />
        <Button size="small" label="저장" @click="saveImage" />
      </div>
    </div>
  </AuthorizationRequiredArea>
</template>

<script setup>
import { useToast } from 'primevue';
import { onUnmounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import AuthorizationRequiredArea from '@/components/common/AuthorizationRequiredArea.vue';

const router = useRouter();
const toast = useToast();

const isAuthorized = ref(false);
const previewUrl = ref(null);
const inputRef = ref(null);

const clickChoose = () => {
  inputRef.value?.click();
};

const changeFile = event => {
  const { files } = event.target;
  if (files.length > 0) {
    const file = files[0];
    URL.revokeObjectURL(previewUrl); // 기존 파일 지우고
    previewUrl.value = URL.createObjectURL(file); // 새로운 파일로 교체
  }
};

const saveImage = () => {
  console.log('서명 저장 API');
  toast.add({ severity: 'success', summary: '성공', detail: '서명이 등록되었습니다.', life: 3000 });
  router.replace({ name: 'hq:my:info' });
};

onUnmounted(() => {
  // 남아있는 리소스 정리
  URL.revokeObjectURL(previewUrl);
});
</script>

<style scoped>
.signature-upload-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  .uploaded-area {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;

    img {
      width: 250px;
      height: 250px;
      object-fit: contain;
    }
  }
}
</style>
