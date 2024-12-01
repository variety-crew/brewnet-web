<template>
  <Card class="safety-stock-card">
    <template #title>
      <div class="safety-stock-card-title">
        <h3>안전재고 위험 목록 ({{ totalElements }}건)</h3>
        <Button
          label="재고대시보드 이동"
          as="router-link"
          :to="{ name: 'hq:stock:storage-stock' }"
          size="small"
          severity="secondary"
        />
      </div>
    </template>
    <template #content>
      <table>
        <thead>
          <tr>
            <th>상품코드</th>
            <th>상품명</th>
            <th>가용재고</th>
            <th>안전재고값</th>
            <th>가용재고 - 안전재고값</th>
            <th>미승인주문</th>
            <th>최소발주필요</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="paginatedWarningSafetyStockList.length === 0">
            <td colspan="8">{{ errMsg }}</td>
          </tr>
          <template v-else>
            <tr v-for="warningSafetyStock in paginatedWarningSafetyStockList" :key="warningSafetyStock.itemCode">
              <td>{{ warningSafetyStock.itemCode }}</td>
              <td>{{ warningSafetyStock.itemName }}</td>
              <td>{{ warningSafetyStock.availableStock }}</td>
              <td>{{ warningSafetyStock.safeStock }}</td>
              <td>{{ warningSafetyStock.availableMinusSafeStock }}</td>
              <td>{{ warningSafetyStock.unApprovedOrderCount }}</td>
              <td>{{ warningSafetyStock.minPurchaseCount }}</td>
              <td>
                <Button
                  label="발주요청"
                  size="small"
                  variant="text"
                  class="action-button"
                  as="router-link"
                  :to="{
                    name: 'hq:purchase:form',
                  }"
                />
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </template>
  </Card>
</template>

<script setup>
import { onMounted, ref } from 'vue';

import HQStatisticsApi from '@/utils/api/HQStatisticsApi';

const paginatedWarningSafetyStockList = ref([]);
const totalElements = ref(0);
const errMsg = ref('');

const hqStatisticsApi = new HQStatisticsApi();

onMounted(() => {
  hqStatisticsApi
    .getWarningSafetyStock()
    .then(data => {
      paginatedWarningSafetyStockList.value = data.content;
      totalElements.value = data.totalElements;
    })
    .catch(e => {
      errMsg.value = e.message;
    });
});
</script>

<style scoped>
.safety-stock-card {
  box-shadow: var(--p-primary-100) 0px 2px 8px 0px;

  table {
    width: 100%;

    th {
      background-color: var(--p-surface-100);
      padding: 5px 10px;
      border: 1px solid var(--p-surface-200);
    }

    td {
      padding: 5px 10px;
      border: 1px solid var(--p-surface-200);
      text-align: center;
    }

    th,
    td {
      font-size: 13px;
    }
  }

  .action-button {
    font-size: 13px;
    padding: 2px 5px;
  }

  .safety-stock-card-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
