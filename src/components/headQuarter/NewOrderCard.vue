<template>
  <Card class="new-order-card">
    <template #title>
      <div class="new-order-card-title">
        <h3>신규주문 목록 ({{ totalElements }}건)</h3>
        <Button label="전체보기" as="router-link" :to="{ name: 'hq:order:list' }" size="small" severity="secondary" />
      </div>
    </template>
    <template #content>
      <table>
        <thead>
          <tr>
            <th>주문코드</th>
            <th>지점명</th>
            <th>품목</th>
            <th>총 금액</th>
            <th>주문일자</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="paginatedNewOrderList.length === 0">
            <td colspan="6">{{ errMsg }}</td>
          </tr>
          <template v-else>
            <tr v-for="newOrder in paginatedNewOrderList" :key="newOrder.orderCode">
              <td>{{ newOrder.orderCode }}</td>
              <td>{{ newOrder.franchiseName }}</td>
              <td>{{ newOrder.itemName }}</td>
              <td>{{ (newOrder.totalPrice * 1.1).toLocaleString() }}</td>
              <td>{{ newOrder.createdAt }}</td>
              <td>
                <Button
                  label="주문상세"
                  size="small"
                  variant="text"
                  class="action-button"
                  as="router-link"
                  :to="{
                    name: 'hq:order:detail',
                    params: {
                      orderCode: newOrder.orderCode,
                    },
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

const paginatedNewOrderList = ref([]);
const totalElements = ref(0);
const errMsg = ref('');

const hqStatisticsApi = new HQStatisticsApi();

onMounted(() => {
  hqStatisticsApi
    .getNewOrders()
    .then(data => {
      paginatedNewOrderList.value = data.content;
      totalElements.value = data.totalElements;
    })
    .catch(e => {
      errMsg.value = e.message;
    });
});
</script>

<style scoped>
.new-order-card {
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

  .new-order-card-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
