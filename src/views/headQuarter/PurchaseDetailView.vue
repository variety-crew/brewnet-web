<template>
  <div class="purchase-detail-container">
    <template v-if="purchaseDetail">
      <div class="top-area">
        <Tag
          rounded
          :value="formatKoPurchaseStatus(purchaseDetail.status)"
          :severity="getPurchaseStatusSeverity(purchaseDetail.status)"
          class="mb-1"
        />

        <div class="top-buttons">
          <Button label="발주서 출력" variant="outlined" size="small" />
          <Button label="구매품의서 전송(회계)" variant="outlined" size="small" />
          <Button label="구매품의서 출력" variant="outlined" size="small" />
          <Button label="삭제" severity="danger" size="small" variant="outlined" />
        </div>
      </div>

      <div class="body-area">
        <h1>구매품의서</h1>

        <table class="approval-line-table">
          <tr>
            <th>기안자</th>
            <th>결재자</th>
          </tr>
          <tr>
            <td>{{ purchaseDetail.username }}</td>
            <td></td>
          </tr>
        </table>

        <AppTableStyled full-width>
          <tbody>
            <tr>
              <th>거래처</th>
              <td>{{ purchaseDetail.supplierName }}</td>
              <th>입고창고</th>
              <td>{{ purchaseDetail.storageName }}</td>
              <th>발주일자</th>
              <td>{{ purchaseDetail.createdAt }}</td>
              <th>담당자</th>
              <td>{{ purchaseDetail.username }}</td>
            </tr>
            <tr>
              <th>품목코드</th>
              <th colspan="3">품목명</th>
              <th>수량</th>
              <th>단가</th>
              <th>공급가액</th>
              <th>부가세</th>
            </tr>
            <tr v-for="item in purchaseItems" :key="item.code">
              <td class="align-center">{{ item.uniqueCode }}</td>
              <td colspan="3">{{ item.name }}</td>
              <td></td>
              <td class="align-right">{{ item.purchasePrice.toLocaleString() }}</td>
              <td class="align-right"></td>
              <td class="align-right"></td>
            </tr>
            <tr>
              <th>총 발주금액</th>
              <td colspan="5"></td>
              <td class="align-right"></td>
              <td class="align-right"></td>
            </tr>
            <tr style="height: 100px">
              <th>첨언</th>
              <td colspan="7" class="align-center">{{ purchaseDetail.comment }}</td>
            </tr>
          </tbody>
        </AppTableStyled>
      </div>

      <div class="approval-status-area">
        <h4 class="mb-1">결재이력</h4>
        <AppTableStyled full-width>
          <thead>
            <tr>
              <th>결재자</th>
              <th>결재상태</th>
              <th>비고사항</th>
              <th>결재일시</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="align-center">{결재자이름}</td>
              <td class="align-center">{결재자의 승인/반려}</td>
              <td class="align-center">{결재자의 비고사항}</td>
              <td class="align-center">{결재자의 승인/반려 일자}</td>
            </tr>
          </tbody>
        </AppTableStyled>
      </div>
    </template>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import AppTableStyled from '@/components/common/AppTableStyled.vue';
import { formatKoPurchaseStatus } from '@/utils/format';
import { getPurchaseStatusSeverity } from '@/utils/helper';
import { mockupItems, mockupPurchases } from '@/utils/mockup';

const route = useRoute();

const purchaseDetail = ref(null);
const purchaseItems = ref([]);

onMounted(() => {
  const purchaseCode = route.params.purchaseCode;
  purchaseDetail.value = mockupPurchases.find(e => e.code == purchaseCode);

  purchaseItems.value = [...mockupItems];
});
</script>

<style scoped>
.purchase-detail-container {
  display: flex;
  flex-direction: column;
  gap: 24px;

  .top-area {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .top-buttons {
      display: flex;
      gap: 5px;
    }
  }

  .body-area {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;

    .approval-line-table {
      align-self: flex-end;

      th {
        border: 1px solid black;
        padding: 3px 0;
        font-size: 13px;
        width: 70px;
      }
      td {
        border: 1px solid black;
        font-size: 13px;
        text-align: center;
      }

      & > tr:nth-child(2) {
        height: 50px;
      }
    }
  }

  .approval-status-area {
  }
}
</style>
