<template>
  <div>
    <AppTable
      :paginated-data="paginatedAccounts"
      :columns="columns"
      :total-elements="accounts.length"
      @change-page="onChangePage"
      @reload="reload"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';

import AppTable from '@/components/common/AppTable.vue';
import { useAppConfirmModal } from '@/hooks/useAppConfirmModal';
import { mockupFranchiseAccounts } from '@/utils/mockup';

const router = useRouter();
const { showConfirm } = useAppConfirmModal();
const accounts = ref([]);
const paginatedAccounts = computed(() => {
  return accounts.value.slice(0, 15);
});

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
  { field: 'code', header: '계정코드' },
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

const onChangePage = event => {
  const { page } = event;
  console.log(page, '페이지로 변경되었다!');
};

const reload = () => {
  console.log('reload');
};

onMounted(() => {
  accounts.value = [...mockupFranchiseAccounts];
});
</script>

<style scoped></style>
