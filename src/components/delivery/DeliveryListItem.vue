<template>
  <li class="delivery-item-container" @click="clickItem">
    <div class="top">
      <div>
        <h2>{{ deliveryItem.deliveryFranchiseName }}</h2>
        <p>주문코드: {{ deliveryItem.code }}</p>
      </div>
      <Tag
        :value="formatKoDeliveryStatus(deliveryItem.deliveryStatus)"
        :severity="getTagSeverity(deliveryItem.deliveryStatus)"
        rounded
      />
    </div>
    <div class="bottom">
      <Button label="가맹점 전화걸기" icon="pi pi-phone" severity="secondary" @click.stop="clickCall" />
      <Button
        :label="getDeliveryButtonLabel(deliveryItem.deliveryStatus)"
        :variant="getDeliveryButtonVariant(deliveryItem.deliveryStatus)"
      />
    </div>
  </li>
</template>

<script setup>
import { useRouter } from 'vue-router';

import { ORDER_STATUS } from '@/utils/constant';
import { formatKoDeliveryStatus } from '@/utils/format';

const { deliveryItem } = defineProps({
  deliveryItem: {
    type: Object,
    required: true,
  },
});

const router = useRouter();

const getTagSeverity = status => {
  if (status === ORDER_STATUS.APPROVED) {
    return 'secondary';
  }
  if (status === ORDER_STATUS.SHIPPING) {
    return 'warn';
  }
  return undefined;
};

const getDeliveryButtonLabel = status => {
  if (status === ORDER_STATUS.APPROVED) {
    return '배송 시작';
  }
  if (status === ORDER_STATUS.SHIPPING) {
    return '배송 완료';
  }
  return '';
};

const getDeliveryButtonVariant = status => {
  if (status === ORDER_STATUS.APPROVED) {
    return 'outlined';
  }
  return undefined;
};

const clickCall = () => {
  location.href = `tel:${deliveryItem.contact}`;
};

const clickItem = () => {
  router.push({ name: 'd:detail', params: { code: deliveryItem.code } });
};
</script>

<style scoped>
.delivery-item-container {
  border: 1px solid var(--p-surface-200);
  padding: 16px;
  border-radius: 5px;
  box-shadow: var(--p-primary-100) 0px 2px 8px 0px;
  cursor: pointer;

  .top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .bottom {
    margin-top: 20px;
    display: grid;
    grid-template-columns: 1fr 2.1fr;
    gap: 10px;
  }
}
</style>
