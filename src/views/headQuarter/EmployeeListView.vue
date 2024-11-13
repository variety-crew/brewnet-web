<template>
  <div>
    <AppTable :data="products" :columns="columns" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

import AppTable from '@/components/common/AppTable.vue';

function makeMockData(no, name, id, email, contact, position, role) {
  return { no, name, id, email, contact, position, role };
}

onMounted(() => {
  products.value = [
    makeMockData(100, '홍길동', 'BN001', 'gdhong@bn.com', '010-1111-1111', '대리', '마스터'),
    makeMockData(100, '홍길동', 'BN001', 'gdhong@bn.com', '010-1111-1111', '대리', '마스터'),
    makeMockData(100, '홍길동', 'BN001', 'gdhong@bn.com', '010-1111-1111', '대리', '마스터'),
    makeMockData(100, '홍길동', 'BN001', 'gdhong@bn.com', '010-1111-1111', '대리', '마스터'),
    makeMockData(100, '홍길동', 'BN001', 'gdhong@bn.com', '010-1111-1111', '대리', '마스터'),
    makeMockData(100, '홍길동', 'BN001', 'gdhong@bn.com', '010-1111-1111', '대리', '마스터'),
    makeMockData(100, '홍길동', 'BN001', 'gdhong@bn.com', '010-1111-1111', '대리', '마스터'),
    makeMockData(100, '홍길동', 'BN001', 'gdhong@bn.com', '010-1111-1111', '대리', '마스터'),
    makeMockData(100, '홍길동', 'BN001', 'gdhong@bn.com', '010-1111-1111', '대리', '마스터'),
    makeMockData(100, '홍길동', 'BN001', 'gdhong@bn.com', '010-1111-1111', '대리', '마스터'),
    makeMockData(100, '홍길동', 'BN001', 'gdhong@bn.com', '010-1111-1111', '대리', '마스터'),
    makeMockData(100, '홍길동', 'BN001', 'gdhong@bn.com', '010-1111-1111', '대리', '마스터'),
    makeMockData(100, '홍길동', 'BN001', 'gdhong@bn.com', '010-1111-1111', '대리', '마스터'),
    makeMockData(100, '홍길동', 'BN001', 'gdhong@bn.com', '010-1111-1111', '대리', '마스터'),
    makeMockData(100, '홍길동', 'BN001', 'gdhong@bn.com', '010-1111-1111', '대리', '마스터'),
    makeMockData(100, '홍길동', 'BN001', 'gdhong@bn.com', '010-1111-1111', '대리', '마스터'),
    makeMockData(100, '홍길동', 'BN001', 'gdhong@bn.com', '010-1111-1111', '대리', '마스터'),
    makeMockData(100, '홍길동', 'BN001', 'gdhong@bn.com', '010-1111-1111', '대리', '마스터'),
    makeMockData(100, '홍길동', 'BN001', 'gdhong@bn.com', '010-1111-1111', '대리', '마스터'),
    makeMockData(100, '홍길동', 'BN001', 'gdhong@bn.com', '010-1111-1111', '대리', '마스터'),
    makeMockData(100, '홍길동', 'BN001', 'gdhong@bn.com', '010-1111-1111', '대리', '마스터'),
    makeMockData(100, '홍길동', 'BN001', 'gdhong@bn.com', '010-1111-1111', '대리', '마스터'),
    makeMockData(100, '홍길동', 'BN001', 'gdhong@bn.com', '010-1111-1111', '대리', '마스터'),
  ];
});

const products = ref([]);
const columns = [
  { field: 'no', header: 'No.' },
  { field: 'name', header: '직원명', sortable: true },
  { field: 'id', header: '아이디' },
  { field: 'email', header: '이메일' },
  { field: 'contact', header: '휴대폰번호' },
  { field: 'position', header: '직급' },
  { field: 'role', header: '권한' },
];
</script>

<style scoped></style>
