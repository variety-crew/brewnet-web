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
import { useRouter } from 'vue-router';

import AppTable from '@/components/common/AppTable.vue';
import AppInputText from '@/components/common/form/AppInputText.vue';
import SearchArea from '@/components/common/SearchArea.vue';
import { mockupNotices } from '@/utils/mockup';

const router = useRouter();

const notices = ref([]);
const paginatedNotices = computed(() => {
  return notices.value.slice(0, 15);
});
const titleKeyword = ref('');
const authorKeyword = ref('');

const clickDetail = () => {
  // 공지사항 상세보기
};

const clickEdit = data => {
  router.push({ name: 'hq:board:notice:edit', params: { noticeCode: data.code } });
};

const columns = [
  { field: 'code', header: '공지사항 코드' },
  { field: 'title', header: '제목' },
  { field: 'author', header: '작성자' },
  { field: 'createdAt', header: '작성일시', sortable: true },
  {
    field: '',
    header: '',
    template: {
      button: [
        {
          label: '상세보기',
          clickHandler: clickDetail,
        },
        {
          label: '수정',
          clickHandler: clickEdit,
        },
      ],
    },
  },
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
