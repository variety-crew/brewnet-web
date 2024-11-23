<template>
  <div class="container">
    <h2 class="title">교환/반품 배송 목록</h2>
    <AppTable
      :columns="columns"
      :rows-per-page="pageSize"
      :paginated-data="paginatedExchangeDeliveries"
      :total-elements="totalElements"
      @reload="reloadData"
      @change-page="onChangePage"
    />
  </div>
</template>

<script setup>
import { useToast } from 'primevue';
import { onMounted, ref } from 'vue';

import AppTable from '@/components/common/AppTable.vue';
import { useAppConfirmModal } from '@/hooks/useAppConfirmModal';
import DeliverApi from '@/utils/api/DeliveryApi';
import { DELIVERY_KIND, EXCHANGE_STATUS, RETURN_STATUS } from '@/utils/constant';

const { showConfirm } = useAppConfirmModal();
const toast = useToast();

const paginatedExchangeDeliveries = ref([]);
const page = ref(0);
const pageSize = ref(15);
const totalElements = ref(0);

const deliveryApi = new DeliverApi();

const getDeliveryButtonLabel = status => {
  if (status === EXCHANGE_STATUS.APPROVED) {
    return '회수 시작';
  }
  if (status === EXCHANGE_STATUS.PICKING) {
    return '회수 완료';
  }
  if (status === EXCHANGE_STATUS.PICKED) {
    return '재배송 시작';
  }
  if (status === EXCHANGE_STATUS.SHIPPING) {
    return '재배송 완료';
  }
  return '';
};

const clickCall = data => {
  location.href = `tel:${data.contact}`;
};

const changeDeliveryStatus = (orderCode, toStatus) => {
  deliveryApi
    .changeDeliveryStatus({
      code: orderCode,
      deliveryKind: DELIVERY_KIND.EXCHANGE,
      deliveryStatus: toStatus,
    })
    .then(() => {
      toast.add({ severity: 'success', summary: '처리 성공', detail: '상태 변경 완료', life: 3000 });
      reloadData();
    });
};

const clickChangeStatus = data => {
  const currentStatus = data.deliveryStatus;

  // 변경할 배송상태 설정
  let header = '';
  let acceptLabel = '';
  let message = '';
  let toStatus = null;

  if (currentStatus === EXCHANGE_STATUS.APPROVED) {
    header = '회수 시작';
    acceptLabel = '회수 시작';
    message = '회수를 시작하시겠습니까?';
    toStatus = EXCHANGE_STATUS.PICKING;
  } else if (currentStatus === EXCHANGE_STATUS.PICKING) {
    header = '회수 완료';
    acceptLabel = '회수 완료';
    message = '회수를 완료하시겠습니까?';
    toStatus = EXCHANGE_STATUS.PICKED;
  } else if (currentStatus === EXCHANGE_STATUS.PICKED) {
    header = '재배송 시작';
    acceptLabel = '재배송 시작';
    message = '재배송을 시작하시겠습니까?';
    toStatus = EXCHANGE_STATUS.SHIPPING;
  } else if (currentStatus === EXCHANGE_STATUS.SHIPPING) {
    header = '재배송 완료';
    acceptLabel = '재배송 완료';
    message = '재배송을 완료하시겠습니까?';
    toStatus = EXCHANGE_STATUS.SHIPPED;
  }

  if (!toStatus) {
    toast.add({
      severity: 'error',
      summary: '처리 실패',
      detail: '변경할 상태값이 설정되지 않았습니다. -- 교환',
      life: 3000,
    });
    return;
  }

  showConfirm({
    header,
    message: `[주문코드: ${data.code} / 배송지: ${data.deliveryFranchiseName}] ${message}`,
    acceptLabel,
    onAccept: () => {
      changeDeliveryStatus(data.code, toStatus);
    },
  });
};

const columns = [
  {
    field: 'code',
    header: '주문코드',
  },
  { field: 'deliveryFranchiseName', header: '배송지' },
  {
    field: '',
    header: '가맹점 연락처',
    template: {
      button: [
        {
          getLabel: () => '가맹점',
          getSeverity: () => 'secondary',
          getVariant: () => undefined,
          getIcon: () => 'pi pi-phone',
          clickHandler: clickCall,
        },
      ],
    },
  },
  {
    field: '',
    header: '',
    template: {
      button: [
        {
          getLabel: data => getDeliveryButtonLabel(data.deliveryStatus),
          getVariant: data => undefined,
          clickHandler: clickChangeStatus,
        },
      ],
    },
  },
];

const getDeliveryList = () => {
  deliveryApi
    .getDeliveryList({ page: page.value, pageSize: pageSize.value, deliveryKind: DELIVERY_KIND.EXCHANGE })
    .then(data => {
      paginatedExchangeDeliveries.value = data.content;
      totalElements.value = data.totalElements;
    });
};

const reloadData = () => {
  getDeliveryList();
};

const onChangePage = event => {
  page.value = event.page;
  getDeliveryList();
};

onMounted(() => {
  // getDeliveryList();
  paginatedExchangeDeliveries.value = [
    {
      code: 100,
      deliveryKind: DELIVERY_KIND.EXCHANGE,
      deliveryFranchiseName: '낙성대점',
      deliveryStatus: EXCHANGE_STATUS.APPROVED,
      contact: '01011111111',
    },
    {
      code: 99,
      deliveryKind: DELIVERY_KIND.EXCHANGE,
      deliveryFranchiseName: '숭실대점',
      deliveryStatus: EXCHANGE_STATUS.PICKING,
      contact: '01011111111',
    },
    {
      code: 98,
      deliveryKind: DELIVERY_KIND.EXCHANGE,
      deliveryFranchiseName: '미아점',
      deliveryStatus: EXCHANGE_STATUS.PICKED,
      contact: '01011111111',
    },
    {
      code: 97,
      deliveryKind: DELIVERY_KIND.EXCHANGE,
      deliveryFranchiseName: '미아사거리점',
      deliveryStatus: EXCHANGE_STATUS.SHIPPING,
      contact: '01011111111',
    },
    {
      code: 96,
      deliveryKind: DELIVERY_KIND.RETURN,
      deliveryFranchiseName: '낙성대점',
      deliveryStatus: RETURN_STATUS.APPROVED,
      contact: '01011111111',
    },
    {
      code: 95,
      deliveryKind: DELIVERY_KIND.RETURN,
      deliveryFranchiseName: '숭실대점',
      deliveryStatus: RETURN_STATUS.PICKING,
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

  .title {
    padding: 16px 0;
  }
}
</style>
