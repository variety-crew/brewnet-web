<template>
  <div>
    <SearchArea>
      <AppInputText v-model="titleKeyword" label="제목" />
      <AppInputText v-model="authorKeyword" label="작성자" />
    </SearchArea>

    <AppTable
      :columns="columns"
      :paginated-data="paginatedNotices"
      :total-elements="notices.length"
      @change-page="onChangePage"
      @reload="reload"
    />
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';

import AppTable from '@/components/common/AppTable.vue';
import AppInputText from '@/components/common/form/AppInputText.vue';
import SearchArea from '@/components/common/SearchArea.vue';
import { mockupNotices } from '@/utils/mockup';

const notices = ref([]);
const paginatedNotices = computed(() => {
  return notices.value.slice(0, 15);
});

const columns = [
  { field: 'code', header: '공지사항 코드' },
  { field: 'title', header: '제목' },
  { field: 'author', header: '작성자' },
  { field: 'createdAt', header: '작성일시', sortable: true },
];

const onChangePage = event => {
  const { page } = event;
  console.log(page, '페이지로 변경되었다!');
};

const reload = () => {
  console.log('reload 테이블');
};

onMounted(() => {
  notices.value = [...mockupNotices];
});
</script>

<style scoped></style>
