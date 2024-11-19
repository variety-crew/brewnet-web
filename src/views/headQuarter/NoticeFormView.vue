<template>
  <form class="notice-form-container" @submit.prevent="onSubmit">
    <AppInputText v-model="title" label="제목" />
    <Textarea v-model="content" rows="17" fluid placeholder="내용을 입력해주세요" size="small" />

    <div class="upload-image-area">
      <button type="button" class="upload-button" @click="clickChoose">
        <i class="pi pi-images"></i>
        <p>사진 선택</p>
      </button>
      <input ref="inputRef" type="file" accept="image/*" multiple style="display: none" @change="changeFile" />

      <ul v-if="noticeImages.length > 0" class="upload-image-list">
        <li
          v-for="(uploadImage, i) in noticeImages"
          :key="uploadImage"
          :style="{ backgroundImage: `url(${uploadImage})` }"
          class="upload-image-item"
        >
          <Button
            icon="pi pi-times"
            size="small"
            rounded
            severity="secondary"
            class="remove-button"
            @click="clickRemoveImage(i)"
          />
        </li>
      </ul>
    </div>

    <Button type="submit" label="저장" />
  </form>
</template>

<script setup>
import { useToast } from 'primevue';
import { onUnmounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import AppInputText from '@/components/common/form/AppInputText.vue';
import { mockupNotices } from '@/utils/mockup';

const toast = useToast();
const router = useRouter();
const route = useRoute();

const title = ref('');
const content = ref('');
const inputRef = ref();
const noticeImages = ref([]);

const checkForm = () => {
  try {
    if (!title.value) throw new Error('제목을 입력해주세요.');
    if (!content.value) throw new Error('내용을 입력해주세요.');

    return true;
  } catch (e) {
    toast.add({ severity: 'error', summary: '입력 확인', detail: e.message, life: 3000 });
    return false;
  }
};

const onSubmit = () => {
  const isPass = checkForm();
  if (isPass) {
    console.log('공지사항 등록/수정 API 호출');
    toast.add({ severity: 'success', summary: '처리 성공', detail: '공지사항이 등록되었습니다.', life: 3000 });
    router.replace({ name: 'hq:board:notice:list' });
  }
};

const clickChoose = () => {
  inputRef.value?.click();
};

const changeFile = event => {
  const { files } = event.target;
  if (files.length > 0) {
    const newImages = Array.from(files).map(e => URL.createObjectURL(e));
    noticeImages.value = noticeImages.value.concat(newImages);
  }
};

const clickRemoveImage = targetIndex => {
  noticeImages.value = noticeImages.value.filter((e, i) => i !== targetIndex);
};

watch(
  () => route.params.noticeCode,
  newVal => {
    if (newVal) {
      // 수정모드
      const foundNotice = mockupNotices.find(e => e.code == newVal);
      if (!foundNotice) {
        toast.add({ severity: 'error', summary: '처리 실패', detail: '공지사항 글을 찾을 수 없습니다.', life: 3000 });
        router.back();
        return;
      }

      title.value = foundNotice.title;
      content.value = foundNotice.content;
      noticeImages.value = [...foundNotice.images];
    } else {
      // 등록모드
      title.value = '';
      content.value = '';
      noticeImages.value = [];
    }
  },
  { immediate: true },
);

onUnmounted(() => {
  // 남아있는 리소스 정리
  noticeImages.value.forEach(e => {
    URL.revokeObjectURL(e);
  });
});
</script>

<style scoped>
.notice-form-container {
  display: flex;
  flex-direction: column;
  gap: 16px;

  .upload-image-area {
    display: flex;
    gap: 16px;

    .upload-button,
    .upload-image-item {
      width: 100px;
      height: 100px;
      border-radius: 5px;
    }

    .upload-button {
      background-color: var(--p-surface-100);
      border: none;
      outline: none;
      display: flex;
      flex-direction: column;
      gap: 5px;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s;

      &:hover {
        background-color: var(--p-surface-200);
      }
    }

    .upload-image-list {
      list-style-type: none;
      padding: 0;
      display: flex;
      gap: 20px;

      .upload-image-item {
        background-repeat: no-repeat;
        background-position: center center;
        background-size: contain;
        border: 1px solid var(--p-content-border-color);
        position: relative;

        .remove-button {
          position: absolute;
          top: -16px;
          right: -16px;
        }
      }
    }
  }
}
</style>
