<template>
  <div class="purchase-list-container">
    <SearchArea grid :grid-repeat-count="2" grid-repeat-width="1fr" class="purchase-search">
      <AppDateRangePicker v-model:start="startDate" v-model:end="endDate" label="작성일자" />
      <AppInputText v-model="purchaseCodeKeyword" label="발주코드" />
      <AppInputText v-model="purchaseMemberKeyword" label="기안자명" />
      <AppInputText v-model="supplierKeyword" label="거래처명" />
      <AppInputText v-model="storageKeyword" label="창고명" />
    </SearchArea>
  </div>
</template>

<script setup>
import dayjs from 'dayjs';
import { ref } from 'vue';

import AppDateRangePicker from '@/components/common/form/AppDateRangePicker.vue';
import AppInputText from '@/components/common/form/AppInputText.vue';
import SearchArea from '@/components/common/SearchArea.vue';

const startDate = ref(dayjs().subtract(1, 'year').toDate());
const endDate = ref(new Date());
const purchaseCodeKeyword = ref('');
const purchaseMemberKeyword = ref('');
const supplierKeyword = ref('');
const storageKeyword = ref('');
</script>

<style scoped>
.purchase-search {
  & > *:nth-child(1) {
    grid-column: 1 / 3;
  }
}
</style>
