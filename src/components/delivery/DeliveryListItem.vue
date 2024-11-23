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
        @click.stop="clickChangeStatus(deliveryItem.deliveryStatus)"
      />
    </div>
  </li>
</template>

<script setup>
import { useToast } from 'primevue';
import { useRouter } from 'vue-router';

import { useAppConfirmModal } from '@/hooks/useAppConfirmModal';
import DeliverApi from '@/utils/api/DeliveryApi';
import { DELIVERY_KIND, ORDER_STATUS } from '@/utils/constant';
import { formatKoDeliveryStatus } from '@/utils/format';

const { deliveryItem } = defineProps({
  deliveryItem: {
    type: Object,
    required: true,
  },
});
const emit = defineEmits(['reload-data']);

const router = useRouter();
const { showConfirm } = useAppConfirmModal();
const toast = useToast();

const deliveryApi = new DeliverApi();

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

const changeDeliveryStatus = toStatus => {
  deliveryApi
    .changeDeliveryStatus({
      code: deliveryItem.code,
      deliveryKind: deliveryItem.deliveryKind,
      deliveryStatus: toStatus,
    })
    .then(() => {
      toast.add({ severity: 'success', summary: '처리 성공', detail: '상태 변경 완료', life: 3000 });
      emit('reload-data');
    });
};

const handleOrderDeliveryChangeStatus = currentStatus => {
  // 변경할 배송상태 설정
  let header = '';
  let acceptLabel = '';
  let message = '';
  let toStatus = null;

  if (currentStatus === ORDER_STATUS.APPROVED) {
    header = '배송 시작';
    acceptLabel = '배송 시작';
    message = '배송을 시작하시겠습니까?';
    toStatus = ORDER_STATUS.SHIPPING;
  } else if (currentStatus === ORDER_STATUS.SHIPPING) {
    header = '배송 완료';
    acceptLabel = '배송 완료';
    message = '배송을 완료하시겠습니까?';
    toStatus = ORDER_STATUS.SHIPPED;
  }

  if (!toStatus) {
    throw new Error('변경할 상태값이 설정되지 않았습니다. -- 주문');
  }

  showConfirm({
    header,
    message: `[주문코드: ${deliveryItem.code} / 배송지: ${deliveryItem.deliveryFranchiseName}] ${message}`,
    acceptLabel,
    onAccept: () => {
      changeDeliveryStatus(toStatus);
    },
  });
};

const handleExchangeDeliveryChangeStatus = currentStatus => {};

const handleReturnDeliveryChangeStatus = currentStatus => {};

const clickChangeStatus = currentStatus => {
  try {
    if (deliveryItem.deliveryKind === DELIVERY_KIND.ORDER) {
      handleOrderDeliveryChangeStatus(currentStatus);
    } else if (deliveryItem.deliveryKind === DELIVERY_KIND.EXCHANGE) {
      handleExchangeDeliveryChangeStatus(currentStatus);
    } else if (deliveryItem.deliveryKind === DELIVERY_KIND.RETURN) {
      handleReturnDeliveryChangeStatus(currentStatus);
    }
  } catch (e) {
    toast.add({ severity: 'error', summary: '처리 실패', detail: e.message, life: 3000 });
  }
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
