<template>
  <div>
    <SearchArea grid>
      <AppInputText v-model="titleKeyword" label="제목" />
      <AppInputText v-model="authorKeyword" label="작성자" />
    </SearchArea>

    <AppTable
      :columns="columns"
      :paginated-data="paginatedNotices"
      :total-elements="notices.length"
      :rows-per-page="pageSize"
      @change-page="onChangePage"
      @reload="reload"
    />
  </div>
</template>

<script setup>
import { useToast } from 'primevue';
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import AppTable from '@/components/common/AppTable.vue';
import AppInputText from '@/components/common/form/AppInputText.vue';
import SearchArea from '@/components/common/SearchArea.vue';
import { useAppConfirmModal } from '@/hooks/useAppConfirmModal';
import { mockupNotices } from '@/utils/mockup';

const router = useRouter();
const { showConfirm } = useAppConfirmModal();
const toast = useToast();

const notices = ref([]);
const paginatedNotices = computed(() => {
  return notices.value.slice(0, 15);
});
const pageSize = ref(15);
const titleKeyword = ref('');
const authorKeyword = ref('');

const clickDetail = data => {
  // 공지사항 상세보기
  router.push({ name: 'hq:board:notice:detail', params: { noticeCode: data.code } });
};

const clickEdit = data => {
  router.push({ name: 'hq:board:notice:edit', params: { noticeCode: data.code } });
};

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
          getLabel: () => '상세보기',
          clickHandler: clickDetail,
        },
        {
          getLabel: () => '수정',
          clickHandler: clickEdit,
        },
        {
          getLabel: () => '삭제',
          clickHandler: clickDelete,
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
