<template>
  <div class="purchase-stock-arrival-list-container">
    <SearchArea>
      <AppDateRangePicker
        v-model:start="initialCriteria.startDate"
        v-model:end="initialCriteria.endDate"
        label="발주일자"
        @form-reset="onReset"
        @search="onSearch"
      />
    </SearchArea>
  </div>
</template>

<script setup>
import dayjs from 'dayjs';
import { ref } from 'vue';

import AppDateRangePicker from '@/components/common/form/AppDateRangePicker.vue';
import SearchArea from '@/components/common/SearchArea.vue';

const getInitialCriteria = () => ({
  startDate: dayjs().subtract(1, 'year').toDate(),
  endDate: new Date(),
});
const initialCriteria = ref(getInitialCriteria());

const onSearch = () => {
  // TODO::
};

const onReset = () => {
  initialCriteria.value = getInitialCriteria();
};
</script>

<style scoped>
.purchase-stock-arrival-list-container {
}
</style>
