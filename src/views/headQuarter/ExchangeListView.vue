<template>
  <div>
    <!-- 검색 area -->
    <SearchArea>
      <AppDateRangePicker v-model:start="startDate" v-model:end="endDate" label="사용일자" />
      <!-- <AppSelect v-model="position" label="직급" :options="positionOptions" :initial-value="initialPosition" /> -->
      <AppInputText id="input_name_keyword" v-model="nameKeyword" label="임직원명" />
    </SearchArea>

    <AppTable
      :paginated-data="paginatedExchanges"
      :columns="columns"
      :total-elements="exchanges.length"
      @change-page="onChangePage"
      @reload="reload"
    />

    <DynamicDialog />
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch, defineAsyncComponent } from 'vue';
import { useRouter } from 'vue-router';

import AppTable from '@/components/common/AppTable.vue';
import AppInputText from '@/components/common/form/AppInputText.vue';
import SearchArea from '@/components/common/SearchArea.vue';
import { useAppConfirmModal } from '@/hooks/useAppConfirmModal';
import { useModal } from '@/hooks/useModal';
import { formatKoExchangeReason, formatKoExchangeStatus } from '@/utils/format';
import { mockupExchanges } from '@/utils/mockup';

const router = useRouter();
const { showConfirm } = useAppConfirmModal();
const { openModal } = useModal();

const nameKeyword = ref('');
const exchanges = ref([]);
const paginatedExchanges = computed(() => {
  return exchanges.value.slice(0, 15);
});

const goToDetail = exchangeCode => {
  router.push({ name: 'hq:order:exchange:detail', params: { exchangeCode } });
};

const columns = [
  { field: 'exchangeCode', header: '교환번호', sortable: true },
  { field: 'franchiseName', header: '교환요청지점' },
  { field: 'itemName', header: '교환품목명' },
  { field: 'reason', header: '교환사유', render: formatKoExchangeReason },
  { field: 'status', header: '교환상태', render: formatKoExchangeStatus },
  { field: 'memberCode', header: '교환담당자' },
  { field: 'createdAt', header: '교환요청일자' },
  {
    field: '',
    header: '',
    template: {
      button: [
        {
          label: '상세보기',
          clickHandler: rowData => goToDetail(rowData.exchangeCode),
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
  exchanges.value = [...mockupExchanges];
});
</script>

<style scoped></style>
