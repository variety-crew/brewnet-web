<template>
  <div>
    <!-- 검색 area -->
    <SearchArea>
      <AppInputText id="input_name_keyword" label="사원명" :value="nameKeyword" @change-input="changeNameKeyword" />
    </SearchArea>

    <AppTable
      :paginated-data="paginatedEmployees"
      :columns="columns"
      :total-elements="employees.length"
      :add-button="{ label: '사원 등록', clickHandler: clickAdd }"
      @change-page="onChangePage"
      @reload="reload"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useRouter } from 'vue-router';

import AppTable from '@/components/common/AppTable.vue';
import AppInputText from '@/components/common/form/AppInputText.vue';
import SearchArea from '@/components/common/SearchArea.vue';
import { useInput } from '@/hooks/useInput';
import { formatKoEmployeePosition, formatKoMemberRole } from '@/utils/format';

const router = useRouter();
const employees = ref([]);
const paginatedEmployees = computed(() => {
  return employees.value.slice(0, 15);
});

function onClickEdit(employee) {
  console.log(employee.code);
  router.push({ name: 'hq:settings:employee:form' });
}

function onClickEditRole(employee) {
  console.log(employee.code, '권한설정 클릭됨');
}

function onClickRemove(employee) {
  console.log(employee.code, '삭제 클릭됨');
}

const columns = [
  { field: 'code', header: '사원코드' },
  { field: 'name', header: '사원명', sortable: true },
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

const { value: nameKeyword, onChange: changeNameKeyword } = useInput('');

function makeMockData(code, name, id, email, contact, position, role) {
  return { code, name, id, email, contact, position, role };
}

const onChangePage = event => {
  const { page } = event;
  console.log(page, '페이지로 변경되었다!');
};

const reload = () => {
  console.log('reload 테이블');
};

const clickAdd = () => {
  router.push({ name: 'hq:settings:employee:form' });
};

onMounted(() => {
  employees.value = [
    makeMockData(100, '홍길동', 'BN001', 'gdhong@bn.com', '010-1111-1111', 'STAFF', 'ROLE_MASTER'),
    makeMockData(101, '홍길동', 'BN001', 'gdhong@bn.com', '010-1111-1111', 'STAFF', 'ROLE_MASTER'),
    makeMockData(102, '홍길동', 'BN001', 'gdhong@bn.com', '010-1111-1111', 'STAFF', 'ROLE_MASTER'),
    makeMockData(103, '홍길동', 'BN001', 'gdhong@bn.com', '010-1111-1111', 'STAFF', 'ROLE_MASTER'),
    makeMockData(104, '홍길동', 'BN001', 'gdhong@bn.com', '010-1111-1111', 'STAFF', 'ROLE_MASTER'),
    makeMockData(105, '홍길동', 'BN001', 'gdhong@bn.com', '010-1111-1111', 'STAFF', 'ROLE_MASTER'),
    makeMockData(106, '홍길동', 'BN001', 'gdhong@bn.com', '010-1111-1111', 'STAFF', 'ROLE_MASTER'),
    makeMockData(107, '홍길동', 'BN001', 'gdhong@bn.com', '010-1111-1111', 'STAFF', 'ROLE_MASTER'),
    makeMockData(108, '홍길동', 'BN001', 'gdhong@bn.com', '010-1111-1111', 'STAFF', 'ROLE_MASTER'),
    makeMockData(109, '홍길동', 'BN001', 'gdhong@bn.com', '010-1111-1111', 'STAFF', 'ROLE_MASTER'),
    makeMockData(110, '홍길동', 'BN001', 'gdhong@bn.com', '010-1111-1111', 'STAFF', 'ROLE_GENERAL_ADMIN'),
    makeMockData(111, '홍길동', 'BN001', 'gdhong@bn.com', '010-1111-1111', 'STAFF', 'ROLE_GENERAL_ADMIN'),
    makeMockData(100, '홍길동', 'BN001', 'gdhong@bn.com', '010-1111-1111', 'STAFF', 'ROLE_GENERAL_ADMIN'),
    makeMockData(100, '홍길동', 'BN001', 'gdhong@bn.com', '010-1111-1111', 'MANAGER', 'ROLE_GENERAL_ADMIN'),
    makeMockData(100, '홍길동', 'BN001', 'gdhong@bn.com', '010-1111-1111', 'MANAGER', 'ROLE_GENERAL_ADMIN'),
    makeMockData(100, '홍길동', 'BN001', 'gdhong@bn.com', '010-1111-1111', 'MANAGER', 'ROLE_GENERAL_ADMIN'),
    makeMockData(100, '홍길동', 'BN001', 'gdhong@bn.com', '010-1111-1111', 'MANAGER', 'ROLE_GENERAL_ADMIN'),
    makeMockData(100, '홍길동', 'BN001', 'gdhong@bn.com', '010-1111-1111', 'MANAGER', 'ROLE_GENERAL_ADMIN'),
    makeMockData(100, '홍길동', 'BN001', 'gdhong@bn.com', '010-1111-1111', 'MANAGER', 'ROLE_GENERAL_ADMIN'),
    makeMockData(100, '홍길동', 'BN001', 'gdhong@bn.com', '010-1111-1111', 'MANAGER', 'ROLE_GENERAL_ADMIN'),
    makeMockData(100, '홍길동', 'BN001', 'gdhong@bn.com', '010-1111-1111', 'MANAGER', 'ROLE_GENERAL_ADMIN'),
    makeMockData(100, '홍길동', 'BN001', 'gdhong@bn.com', '010-1111-1111', 'MANAGER', 'ROLE_GENERAL_ADMIN'),
    makeMockData(100, '홍길동', 'BN001', 'gdhong@bn.com', '010-1111-1111', 'MANAGER', 'ROLE_RESPONSIBLE_ADMIN'),
  ];
});

// 직원명 변경되었을 때
watch(nameKeyword, newVal => {
  console.log(newVal);
});
</script>

<style scoped></style>
