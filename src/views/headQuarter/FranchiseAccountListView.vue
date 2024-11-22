<template>
  <div>
    <AppTable
      :paginated-data="paginatedFranchiseMembers"
      :columns="columns"
      :total-elements="totalElements"
      :rows-per-page="pageSize"
      @change-page="onChangePage"
      @reload="reload"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';

import AppTable from '@/components/common/AppTable.vue';
import { useAppConfirmModal } from '@/hooks/useAppConfirmModal';
import HQFranchiseApi from '@/utils/api/HQFranchiseApi';

const router = useRouter();
const { showConfirm } = useAppConfirmModal();

const page = ref(0);
const paginatedFranchiseMembers = ref([]);
const totalElements = ref(0);
const pageSize = ref(15);

const hqFranchiseApi = new HQFranchiseApi();

function onClickEdit(data) {
  router.push({ name: 'hq:partner:franchise-account:edit', params: { memberCode: data.code } });
}

function onAcceptRemove() {
  console.log('삭제 완료');
}

function onClickRemove(data) {
  showConfirm({
    header: '가맹점 계정 삭제',
    message: `[${data.franchiseName}] 계정을 삭제하시겠습니까?`,
    acceptLabel: '네, 삭제합니다.',
    danger: true,
    onAccept: onAcceptRemove,
  });
}

const columns = [
  { field: 'memberCode', header: '계정코드' },
  { field: 'id', header: '아이디' },
  { field: 'email', header: '이메일' },
  { field: 'contact', header: '휴대폰번호' },
  { field: 'franchiseName', header: '지점명' },
  {
    field: '',
    header: '',
    template: {
      button: [
        {
          getLabel: () => '정보수정',
          clickHandler: onClickEdit,
        },
        {
          getLabel: () => '삭제',
          clickHandler: onClickRemove,
        },
      ],
    },
  },
];

const getFranchiseMembers = () => {
  hqFranchiseApi.getFranchiseMembers({ page: page.value, pageSize: pageSize.value }).then(data => {
    totalElements.value = data.totalElements;
    paginatedFranchiseMembers.value = data.content;
  });
};

const onChangePage = event => {
  page.value = event.page;
};

const reload = () => {
  getFranchiseMembers();
};

onMounted(() => {
  getFranchiseMembers();
});

// 페이지 변경되면 API 호출
watch(page, () => {
  getFranchiseMembers();
});
</script>

<style scoped></style>
