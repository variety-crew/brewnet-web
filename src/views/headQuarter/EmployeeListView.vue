<template>
  <div>
    <!-- 검색 area -->
    <SearchArea>
      <AppInputText id="input_name_keyword" v-model="nameKeyword" label="임직원명" />
    </SearchArea>

    <AppTable
      :paginated-data="paginatedEmployees"
      :columns="columns"
      :total-elements="employees.length"
      @change-page="onChangePage"
      @reload="reload"
    />
  </div>
</template>

<script setup>
import { useDialog } from 'primevue';
import { ref, onMounted, computed, watch, defineAsyncComponent } from 'vue';
import { useRouter } from 'vue-router';

import AppTable from '@/components/common/AppTable.vue';
import AppInputText from '@/components/common/form/AppInputText.vue';
import SearchArea from '@/components/common/SearchArea.vue';
import { useAppConfirmModal } from '@/hooks/useAppConfirmModal';
import { formatKoEmployeePosition, formatKoMemberRole } from '@/utils/format';
import { mockupEmployees } from '@/utils/mockup';

const EditMemberRole = defineAsyncComponent(() => import('@/components/headQuarter/EditMemberRoleModalBody.vue'));

const router = useRouter();
const { showConfirm } = useAppConfirmModal();
const dialog = useDialog();

const nameKeyword = ref('');
const employees = ref([]);
const paginatedEmployees = computed(() => {
  return employees.value.slice(0, 15);
});

function onClickEdit(data) {
  console.log(data.code);
  router.push({ name: 'hq:settings:employee:edit', params: { memberId: data.code } });
}

function onClickEditRole(data) {
  dialog.open(EditMemberRole, {
    props: {
      header: '권한 설정',
      style: {
        width: '50vw',
      },
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw',
      },
      modal: true,
    },
    data: {
      member: data,
    },
  });
}

function onAcceptRemove() {
  console.log('삭제 완료');
}

function onClickRemove(data) {
  showConfirm({
    header: '임직원 삭제',
    message: `[${data.name}] 임직원을 삭제하시겠습니까?`,
    acceptLabel: '네, 삭제합니다.',
    danger: true,
    onAccept: onAcceptRemove,
  });
}

const columns = [
  { field: 'code', header: '임직원코드' },
  { field: 'name', header: '임직원명', sortable: true },
  { field: 'id', header: '아이디' },
  { field: 'email', header: '이메일' },
  { field: 'contact', header: '휴대폰번호' },
  { field: 'position', header: '직급', render: formatKoEmployeePosition },
  {
    field: 'role',
    header: '권한',
    render: formatKoMemberRole,
  },
  {
    field: '',
    header: '',
    template: {
      button: [
        {
          label: '정보수정',
          clickHandler: onClickEdit,
        },
        {
          label: '권한설정',
          clickHandler: onClickEditRole,
        },
        {
          label: '삭제',
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
  console.log('reload 테이블');
};

onMounted(() => {
  employees.value = [...mockupEmployees];
});

// 임직원명으로 검색
watch(nameKeyword, newVal => {
  console.log(newVal);
});
</script>

<style scoped></style>
