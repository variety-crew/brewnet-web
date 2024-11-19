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

    <Divider />

    <p>{{ notice.content }}</p>

    <AppImageList :images="notice.images" />
  </div>
  <EmptyContent v-else text="공지사항 글을 찾을 수 없습니다." fallback-label="돌아가기" @fallback="goBack" />
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import AppImageList from '@/components/common/AppImageList.vue';
import EmptyContent from '@/components/common/EmptyContent.vue';
import { mockupNotices } from '@/utils/mockup';

const route = useRoute();
const router = useRouter();

const notice = ref(null);

const items = ref([
  {
    label: '수정',
    icon: 'pi pi-pen-to-square',
    command: () => {
      toast.add({ severity: 'success', summary: 'Update', detail: 'Data Updated', life: 3000 });
    },
  },
  {
    label: '삭제',
    icon: 'pi pi-trash',
    command: () => {
      toast.add({ severity: 'error', summary: 'Delete', detail: 'Data Deleted', life: 3000 });
    },
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

    .left {
      .small {
        color: var(--p-surface-600);
      }
    }
  }
}
</style>
