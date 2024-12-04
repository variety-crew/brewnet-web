<template>
  <div class="return-other-dept-container">
    <AppTabs v-model="activeTab" :tab-items="tabItems" />

    <div class="content">
      <ReturnOtherStockDept v-if="activeTab === TAB_ITEM.STOCK_DEPT" />
      <ReturnOtherAccountDept v-else-if="activeTab === TAB_ITEM.ACCOUNT_DEPT" />
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';

import AppTabs from '@/components/common/AppTabs.vue';
import ReturnOtherAccountDept from '@/components/headQuarter/ReturnOtherAccountDept.vue';
import ReturnOtherStockDept from '@/components/headQuarter/ReturnOtherStockDept.vue';
import { makeTabs } from '@/utils/helper';

const TAB_ITEM = {
  STOCK_DEPT: 'STOCK_DEPT',
  ACCOUNT_DEPT: 'ACCOUNT_DEPT',
};
function formatKoTabItem(tabValue) {
  if (tabValue === TAB_ITEM.STOCK_DEPT) return '반품처리내역(재고부서)';
  if (tabValue === TAB_ITEM.ACCOUNT_DEPT) return '환불처리내역(회계부서)';
  return 'Tab';
}

const activeTab = ref(TAB_ITEM.STOCK_DEPT);

const tabItems = computed(() => {
  return [TAB_ITEM.STOCK_DEPT, TAB_ITEM.ACCOUNT_DEPT].map(e => makeTabs(formatKoTabItem(e), e));
});
</script>

<style scoped>
.return-other-dept-container {
  .content {
    padding: 32px 16px;
  }
}
</style>
