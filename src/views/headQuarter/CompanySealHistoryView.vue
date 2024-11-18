<template>
  <div>
    <SearchArea>
      <AppDateRangePicker v-model:start="startDate" v-model:end="endDate" label="사용일자" />
    </SearchArea>

    <AppTable
      :paginated-data="paginatedHistories"
      :columns="columns"
      :total-elements="histories.length"
      @change-page="onChangePage"
      @reload="reload"
    />
  </div>
</template>

<script setup>
import dayjs from 'dayjs';
import { computed, onMounted, ref } from 'vue';

import AppTable from '@/components/common/AppTable.vue';
import AppDateRangePicker from '@/components/common/form/AppDateRangePicker.vue';
import SearchArea from '@/components/common/SearchArea.vue';
import { mockupCompanySealHistory } from '@/utils/mockup';

const histories = ref([]);
const paginatedHistories = computed(() => {
  return histories.value.slice(0, 15);
});
const startDate = ref(dayjs().subtract(1, 'year').toDate());
const endDate = ref(new Date());

const onClickUploadSignature = data => {
  console.log(data);
};

const columns = [
  { field: 'code', header: 'No.' },
  { field: 'name', header: '임직원명' },
  { field: 'reason', header: '사유' },
  { field: 'useDate', header: '사용일자' },
  {
    field: '',
    header: '서명',
    template: {
      button: [{ label: '보기', clickHandler: onClickUploadSignature }],
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
  histories.value = [...mockupCompanySealHistory];
});
</script>

<style scoped></style>
