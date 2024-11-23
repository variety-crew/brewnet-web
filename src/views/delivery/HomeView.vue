<template>
  <div class="container">
    <div class="top">
      <h2 class="title">배송 목록</h2>
      <!-- <Button icon="pi pi-refresh" variant="outlined" /> -->
    </div>
    <DeliveryList :delivery-items="orderDeliveryList" @reload-data="reloadData" />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

import DeliveryList from '@/components/delivery/DeliveryList.vue';
import DeliverApi from '@/utils/api/DeliveryApi';
import { DELIVERY_KIND, ORDER_STATUS } from '@/utils/constant';

const orderDeliveryList = ref([]);

const deliveryApi = new DeliverApi();
let page = 0;
const pageSize = 15;

const getDeliveryList = () => {
  deliveryApi.getDeliveryList({ page, pageSize, deliveryKind: DELIVERY_KIND.ORDER }).then(data => {
    orderDeliveryList.value = data.content;
  });
};

const reloadData = () => {
  page = 0;
  getDeliveryList();
};

onMounted(() => {
  // getDeliveryList();
  orderDeliveryList.value = [
    {
      code: 100,
      deliveryKind: DELIVERY_KIND.ORDER,
      deliveryFranchiseName: '낙성대점',
      deliveryStatus: ORDER_STATUS.APPROVED,
      contact: '01011111111',
    },
    {
      code: 99,
      deliveryKind: DELIVERY_KIND.ORDER,
      deliveryFranchiseName: '숭실대점',
      deliveryStatus: ORDER_STATUS.SHIPPING,
      contact: '01011111111',
    },
  ];
});
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  padding: 0 16px;

  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 0;
  }

  .title {
  }
}
</style>
