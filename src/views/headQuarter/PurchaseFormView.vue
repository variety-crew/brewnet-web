<template>
  <div class="purchase-form-container">
    <Button label="등록" class="save-button" @click="clickSave" />

    <div class="top-area">
      <AppAutoComplete
        v-model="selectedSupplier"
        label="거래처 선택"
        :suggestions="supplierSuggestions"
        placeholder="거래처명이나 거래처코드로 검색"
        full-width
        @complete-input="onCompleteInputSupplier"
      />
      <AppAutoComplete
        v-model="selectedStorage"
        label="입고창고 선택"
        :suggestions="storageSuggestions"
        placeholder="창고명이나 창고코드로 검색"
        full-width
        @complete-input="onCompleteInputStorage"
      />
      <AppInputText :model-value="dayjs().format('YYYY-MM-DD')" label="발주일자" disabled />
      <AppInputText :model-value="userStore.username" disabled label="담당자" />
    </div>

    <AppTableStyled full-width>
      <thead>
        <tr>
          <th>
            <CheckBox v-model="allCheck" binary />
          </th>
          <th v-for="header in tableHeader" :key="header">{{ header }}</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="selectedSupplier">
          <tr v-for="item in items" :key="item.code">
            <td class="align-center">
              <Checkbox v-model="checkedItemCodes" name="itemByPurchase" :value="item.code" />
            </td>
            <td class="align-center">{{ item.uniqueCode }}</td>
            <td>{{ item.name }}</td>
            <td>
              <AppInputText
                v-model="item.quantity"
                :disabled="!checkedItemCodes.includes(item.code)"
                :placeholder="
                  checkedItemCodes.includes(item.code) ? undefined : '발주를 원하시면 체크 선택을 해주세요.'
                "
                number-mode
                :text-align="checkedItemCodes.includes(item.code) ? 'right' : 'center'"
              />
            </td>
            <td class="align-right">{{ item.purchasePrice.toLocaleString() }}</td>
            <td class="align-right">{{ calculateSum(item.purchasePrice, item.quantity).toLocaleString() }}</td>
            <td class="align-right">
              {{ calculateTax(calculateSum(item.purchasePrice, item.quantity)).toLocaleString() }}
            </td>
          </tr>
        </template>
        <template v-else>
          <tr>
            <td colspan="7" class="empty-td">거래처를 선택해주세요.</td>
          </tr>
        </template>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="5">총 합계 {{ total.toLocaleString() }}</td>
          <td class="align-right">{{ totalSupplyValue.toLocaleString() }}</td>
          <td class="align-right">{{ totalTaxValue.toLocaleString() }}</td>
        </tr>
      </tfoot>
    </AppTableStyled>

    <AppInputText v-model="comment" label="첨언" placeholder="비고사항 등 입력" />

    <div class="approval-area">
      <h4 class="mb-4">결재라인 설정</h4>
      <div class="approval-line">
        <AppInputText :model-value="approvalLine.title" label="결재자 선택" disabled />
        <AppAutoComplete
          v-model="selectedApprovalUser"
          :suggestions="approvalUserSuggestions"
          full-width
          placeholder="임직원명으로 검색"
          @complete-input="onCompleteInputApprovalUser"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import dayjs from 'dayjs';
import { useToast } from 'primevue';
import { computed, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

import AppTableStyled from '@/components/common/AppTableStyled.vue';
import AppAutoComplete from '@/components/common/form/AppAutoComplete.vue';
import AppInputText from '@/components/common/form/AppInputText.vue';
import { useAppConfirmModal } from '@/hooks/useAppConfirmModal';
import { useUserStore } from '@/stores/user';
import { formatKoEmployeePosition } from '@/utils/format';
import { makeAutocompleteSuggestion } from '@/utils/helper';
import { mockupApprovalLines, mockupEmployees, mockupItems, mockupStorages, mockupSuppliers } from '@/utils/mockup';

const userStore = useUserStore();
const toast = useToast();
const router = useRouter();
const { showConfirm } = useAppConfirmModal();

const selectedSupplier = ref(null);
const filteredSuppliers = ref([]);
const supplierSuggestions = computed(() => {
  return filteredSuppliers.value.map(e => makeAutocompleteSuggestion(e.code, `#${e.code} ${e.name}`));
});

const selectedStorage = ref(null);
const filteredStorages = ref([]);
const storageSuggestions = computed(() => {
  return filteredStorages.value.map(e => makeAutocompleteSuggestion(e.code, `#${e.code} ${e.name}`));
});

const allCheck = ref(false);
const tableHeader = ref(['품목코드', '품목명', '수량', '단가', '공급가액', '부가세']);
const items = ref([]);
const checkedItemCodes = ref([]); // 체크박스 선택된 상품(코드)들
const totalSupplyValue = ref(0);
const totalTaxValue = ref(0);
const total = computed(() => totalSupplyValue.value + totalTaxValue.value);
const comment = ref('');

const approvalLine = ref(mockupApprovalLines.find(e => e.code === 'purchase'));
const approvalUserSuggestions = ref([]);
const selectedApprovalUser = ref(null);

const onCompleteInputSupplier = event => {
  // if (!event.query) return;
  // filteredSuppliers.value = mockupSuppliers.filter(
  //   e => e.code.toString().includes(event.query) || e.name.includes(event.query),
  // );

  filteredSuppliers.value = [...mockupSuppliers];
};

const onCompleteInputStorage = event => {
  filteredStorages.value = [...mockupStorages];
};

const onCompleteInputApprovalUser = event => {
  approvalUserSuggestions.value = mockupEmployees
    .filter(e => approvalLine.value.positions.includes(e.position))
    .map(e => makeAutocompleteSuggestion(e.code, `${e.name}(${formatKoEmployeePosition(e.position)})`));
};

const calculateSum = (price, quantity) => {
  if (!price || !quantity) return 0;
  return price * quantity;
};

const calculateTax = sum => {
  return sum * 0.1;
};

const checkForm = () => {
  try {
    if (!selectedSupplier.value) throw new Error('거래처를 선택해주세요.');
    if (!selectedStorage.value) throw new Error('입고창고를 선택해주세요.');
    if (checkedItemCodes.value.length === 0) throw new Error('발주 품목을 입력해주세요.');
    if (totalSupplyValue.value === 0) throw new Error('수량을 입력해주세요.');
    if (!selectedApprovalUser.value) throw new Error('결재자를 선택해주세요');

    return true;
  } catch (e) {
    toast.add({ severity: 'error', summary: '입력 확인', detail: e.message, life: 3000 });
    return false;
  }
};

const onPurchaseSave = () => {
  //TODO:: 발주 등록 API 호출
  const newPurchaseCode = 201;

  toast.add({
    severity: 'success',
    summary: '처리 성공',
    detail: '발주에 대한 결재요청이 등록되었습니다.',
    life: 3000,
  });
  router.replace({ name: 'hq:purchase:detail', params: { purchaseCode: newPurchaseCode } });
};

const clickSave = () => {
  const isPass = checkForm();
  if (!isPass) return;
  showConfirm({
    header: '최종 확인',
    message: '입력된 내용으로 발주 등록이 진행됩니다.',
    acceptLabel: '발주 등록',
    onAccept: onPurchaseSave,
  });
};

// 선택된 거래처가 변경된 경우, 아이템 목록 셋팅
watch(selectedSupplier, newVal => {
  if (!newVal) return;
  items.value = mockupItems.map(e => ({ ...e, quantity: null }));
});

// items가 변하면(items 안의 quantity가 변하면면) 총합 계산
watch(
  items,
  newItems => {
    // 공급가액 총액 계산
    totalSupplyValue.value = newItems
      .map(e => calculateSum(e.purchasePrice, e.quantity))
      .reduce((prev, current) => prev + current, 0);

    // 부가세 총액 계산
    totalTaxValue.value = newItems
      .map(e => calculateTax(calculateSum(e.purchasePrice, e.quantity)))
      .reduce((prev, current) => prev + current, 0);
  },
  { deep: true }, // items 내용이 변하면 watch 되도록 설정
);

// allCheck가 변하면 item 체크박스 조정
watch(allCheck, newAllCheck => {
  if (newAllCheck) {
    checkedItemCodes.value = items.value.map(e => e.code);
  } else {
    checkedItemCodes.value = [];
  }
});

// item의 check 상태가 변하면 입력한 수량 조정
watch(checkedItemCodes, newCheckedItemCodes => {
  const clearTargetItems = items.value.map(e => ({
    ...e,
    quantity: newCheckedItemCodes.includes(e.code) ? e.quantity : null,
  }));
  items.value = clearTargetItems;
});
</script>

<style scoped>
.purchase-form-container {
  display: flex;
  flex-direction: column;
  gap: 24px;

  .top-area {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }

  .empty-td {
    text-align: center;
  }

  td.align-right {
    text-align: right;
  }

  td.align-center {
    text-align: center;
  }

  .approval-area {
    background-color: var(--p-primary-50);
    padding: 20px;

    .approval-line {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
      align-items: flex-end;
    }
  }

  .save-button {
    align-self: flex-end;
  }
}
</style>
