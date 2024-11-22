<template>
  <div>
    <!-- 검색 area -->
    <SearchArea grid>
      <AppInputText id="input_name_keyword" v-model="nameKeyword" label="임직원명" />
    </SearchArea>

    <AppTable
      :paginated-data="paginatedEmployees"
      :columns="columns"
      :total-elements="totalElements"
      @change-page="onChangePage"
      @reload="reload"
    />

    <DynamicDialog />
  </div>
</template>

<script setup>
import { ref, onMounted, watch, defineAsyncComponent } from 'vue';
import { useRouter } from 'vue-router';

import AppTable from '@/components/common/AppTable.vue';
import AppInputText from '@/components/common/form/AppInputText.vue';
import SearchArea from '@/components/common/SearchArea.vue';
import { useAppConfirmModal } from '@/hooks/useAppConfirmModal';
import { useModal } from '@/hooks/useModal';
import MemberApi from '@/utils/api/MemberApi';
import { formatKoMemberRole } from '@/utils/format';

const EditMemberRole = defineAsyncComponent(() => import('@/components/headQuarter/EditMemberRoleModalBody.vue'));

const router = useRouter();
const { showConfirm } = useAppConfirmModal();
const { openModal } = useModal();

const nameKeyword = ref('');
const paginatedEmployees = ref([]);
const totalElements = ref(0);

const memberApi = new MemberApi();
const page = 0;

function onClickEdit(data) {
  router.push({ name: 'hq:settings:employee:edit', params: { memberCode: data.code } });
}

function onClickEditRole(data) {
  openModal({ component: EditMemberRole, header: '권한 설정', data: { member: data } });
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
  { field: 'memberCode', header: '임직원코드' },
  { field: 'name', header: '임직원명', sortable: true },
  { field: 'id', header: '아이디' },
  { field: 'email', header: '이메일' },
  { field: 'contact', header: '휴대폰번호' },
  { field: 'positionName', header: '직급' },
  {
    field: 'role',
    header: '권한',
    render: data => formatKoMemberRole(data.role),
  },
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
          getLabel: () => '권한설정',
          clickHandler: onClickEditRole,
        },
        {
          getLabel: () => '삭제',
          clickHandler: onClickRemove,
        },
      ],
    },
  },
];

const getEmployees = () => {
  memberApi.getMembers({ page, memberName: nameKeyword.value }).then(data => {
    totalElements.value = data.totalElements;
    paginatedEmployees.value = data.content;
  });
};

const onChangePage = event => {
  const { page } = event;
  console.log(page, '페이지로 변경되었다!');
};

const reload = () => {
  console.log('reload 테이블');
};

onMounted(() => {
  getEmployees();
});

// 임직원명으로 검색
watch(nameKeyword, newVal => {
  console.log(newVal);
});
</script>

<style scoped></style>
