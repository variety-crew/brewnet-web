<template>
  <div v-if="notice" class="notice-detail-container">
    <Button
      size="small"
      label="목록으로"
      variant="outlined"
      severity="secondary"
      class="mb-4"
      @click="$router.back()"
    />

    <div class="top">
      <div class="left">
        <h2 class="title mb-4">{{ notice.title }}</h2>
        <small class="small">{{ notice.author }} / {{ notice.createdAt }}</small>
      </div>

      <SpeedDial
        :model="items"
        direction="left"
        :button-props="{ rounded: true }"
        :tooltip-options="{ position: 'top' }"
      >
        <template #button="{ toggleCallback }">
          <Button size="small" icon="pi pi-ellipsis-v" @click="toggleCallback" />
        </template>
      </SpeedDial>
    </div>

    <div class="bottom">
      <p class="content">{{ notice.content }}</p>
      <AppImageList :images="notice.images" vertical />
    </div>
  </div>
  <EmptyContent v-else text="공지사항 글을 찾을 수 없습니다." fallback-label="돌아가기" @fallback="goBack" />
</template>

<script setup>
import { useToast } from 'primevue';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import AppImageList from '@/components/common/AppImageList.vue';
import EmptyContent from '@/components/common/EmptyContent.vue';
import { useAppConfirmModal } from '@/hooks/useAppConfirmModal';
import { mockupNotices } from '@/utils/mockup';

const route = useRoute();
const router = useRouter();
const { showConfirm } = useAppConfirmModal();
const toast = useToast();

const notice = ref(null);

const onDelete = () => {
  router.replace({ name: 'hq:board:notice:list' });
  toast.add({ severity: 'success', summary: '처리 성공', detail: '공지사항 글이 삭제되었습니다.', life: 3000 });
};
const clickDelete = () => {
  showConfirm({
    header: '글 삭제',
    message: '공지사항 글을 삭제하시겠습니까?',
    acceptLabel: '글 삭제',
    danger: true,
    onAccept: onDelete,
  });
};

const clickEdit = () => {
  router.push({ name: 'hq:board:notice:edit', params: { noticeCode: route.params.noticeCode } });
};

const items = ref([
  {
    label: '수정',
    icon: 'pi pi-pen-to-square',
    command: clickEdit,
  },
  {
    label: '삭제',
    icon: 'pi pi-trash',
    command: clickDelete,
  },
]);

const goBack = () => {
  router.back();
};

onMounted(() => {
  notice.value = mockupNotices.find(e => e.code == route.params.noticeCode);
});
</script>

<style scoped>
.notice-detail-container {
  .top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    background-color: var(--p-primary-50);

    .left {
      .small {
        color: var(--p-surface-600);
      }
    }
  }

  .top,
  .bottom {
    padding: 20px;
  }

  .bottom {
    display: flex;
    align-items: flex-start;
    gap: 16px;

    .content {
      flex-grow: 1;
    }
  }
}
</style>
