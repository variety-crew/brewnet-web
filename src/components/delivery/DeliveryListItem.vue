<template>
  <li class="delivery-item-container">
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
      <Button label="가맹점 전화걸기" icon="pi pi-phone" severity="secondary" />
      <Button :label="getChangeDeliveryStatusLabel(deliveryItem.deliveryStatus)" />
    </div>
  </li>
</template>

<script setup>
import { ORDER_STATUS } from '@/utils/constant';
import { formatKoDeliveryStatus } from '@/utils/format';

const { deliveryItem } = defineProps({
  deliveryItem: {
    type: Object,
    required: true,
  },
});

const getTagSeverity = status => {
  if (status === ORDER_STATUS.APPROVED) {
    return 'secondary';
  }
  if (status === ORDER_STATUS.SHIPPING) {
    return 'warn';
  }
  return undefined;
};

const getChangeDeliveryStatusLabel = status => {
  if (status === ORDER_STATUS.APPROVED) {
    return '배송 시작';
  }
  if (status === ORDER_STATUS.SHIPPING) {
    return '배송 완료';
  }
  return '';
};
</script>

<style scoped>
.delivery-item-container {
  border-top: 1px solid var(--p-surface-200);
  padding: 16px;

  & + & {
    border-bottom: 1px solid var(--p-surface-200);
  }

  .top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .bottom {
    margin-top: 20px;
    display: grid;
    grid-template-columns: 1fr 2.5fr;
    gap: 10px;
  }
}
</style>
