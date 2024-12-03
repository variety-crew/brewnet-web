<template>
  <Dialog v-model:visible="show" :draggable="false">
    <div id="export_target">
      <h1 class="mb-8">{{ title }}</h1>

      <!-- 거래명세서 출력은 사업자 정보도 함께 표시 -->
      <AppTableStyled
        v-if="printType === PRINT_TYPE.HQ.ORDER_INVOICE && companyInfo && franchiseInfo"
        full-width
        class="mb-5 invoice-table"
      >
        <tr>
          <th rowspan="3" class="fc type">공 급 받 는 자</th>
          <th class="fc">상호명</th>
          <td class="fc align-center">{{ franchiseInfo.franchiseName }}</td>
          <th rowspan="3" class="hq type">공 급 자</th>
          <th class="hq">상호명</th>
          <td class="hq align-center">{{ companyInfo.name }}</td>
        </tr>
        <tr>
          <th class="fc">사업자번호</th>
          <td class="fc align-center">{{ formatBusinessNumber(franchiseInfo.businessNumber) }}</td>
          <th class="hq">사업자번호</th>
          <td class="hq align-center">{{ formatBusinessNumber(companyInfo.businessNumber) }}</td>
        </tr>
        <tr>
          <th class="fc">대표자명</th>
          <td class="fc align-center">{{ franchiseInfo.name }}</td>
          <th class="hq">대표자명</th>
          <td class="hq align-center">{{ companyInfo.ceoName }}</td>
        </tr>
      </AppTableStyled>

      <OrderDetailTable :order-detail="orderDetail" />
    </div>

    <template #footer>
      <Button size="small" label="PDF 출력" @click="exportDocument" />
    </template>
  </Dialog>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';

import CompanyApi from '@/utils/api/CompanyApi';
import HQFranchiseApi from '@/utils/api/HQFranchiseApi';
import { PRINT_TYPE } from '@/utils/constant';
import { formatBusinessNumber } from '@/utils/format';
import PrintPDFManager from '@/utils/PrintPDFManager';

import OrderDetailTable from './OrderDetailTable.vue';
import AppTableStyled from '../common/AppTableStyled.vue';

const { orderDetail, printType } = defineProps({
  orderDetail: {
    type: Object,
    required: true,
  },
  printType: {
    type: String,
    required: false,
    default: PRINT_TYPE.HQ.ORDER_DRAFT,
  },
});
const show = defineModel('show', { type: Boolean, required: true });

const companyInfo = ref(null);
const franchiseInfo = ref(null);

const title = computed(() => {
  if (printType === PRINT_TYPE.HQ.ORDER_DRAFT) return '주문 요청서';
  if (printType === PRINT_TYPE.HQ.ORDER_INVOICE) return '거래 명세서';
  return '';
});

const printPDFManager = new PrintPDFManager();
const companyApi = new CompanyApi();
const hqFranchiseApi = new HQFranchiseApi();

const exportDocument = () => {
  printPDFManager.exportPDF('#export_target', title.value);
};

onMounted(() => {
  // 회사정보 가져오기
  companyApi.getCompanyInfo().then(data => {
    companyInfo.value = data;
  });

  // 가맹점 정보 가져오기
  hqFranchiseApi.getFranchise(orderDetail.franchiseCode).then(data => {
    franchiseInfo.value = data;
  });
});
</script>

<style scoped>
#export_target {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;

  .invoice-table {
    .hq {
      background-color: #f4fce3;
    }

    .fc {
      background-color: #fff5f5;
    }

    th.type {
      writing-mode: vertical-lr;
    }
  }
}
</style>
