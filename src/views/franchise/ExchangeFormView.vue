<template>
  <div class="exchange-detail-container">
    <div class="top-area">
      <!-- <div class="top-buttons">
        <Button label="가능한 주문목록조회 test" variant="outlined" size="small" @click="getAvailableOrders" />
        <Button label="반품" variant="outlined" size="small" :disabled="!isCompleted" @click="clickReturn" />
        <Button label="목록으로" size="small" severity="secondary" variant="outlined" @click="clickGoToList" />
        <Button
          label="취소"
          severity="danger"
          size="small"
          variant="outlined"
          :disabled="!isRequested"
          @click="clickCancel"
        />
      </div> -->
    </div>
    <AppModalBody action-button-label="교환신청" @click-action-button="saveExchange"> </AppModalBody>

    <AppSelect v-model="selectedOrder" label="주문번호" :options="availableOrders" />

    <h4 class="mb-1">교환품목선택</h4>
    <AppTableStyled>
      <thead>
        <tr>
          <th></th>
          <th>품목코드</th>
          <th>품목명</th>
          <th>수량</th>
          <th>단가</th>
          <th>주문금액</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="availableItems.length > 0">
          <tr v-for="item in availableItems" :key="item.itemCode">
            <td class="align-center">
              <Checkbox
                :model-value="selectedItems.includes(item.itemCode)"
                binary
                @change="event => chooseItem(item, event)"
              />
              <!-- <Checkbox
                :checked="selectedItems.value.findIndex(selectedItem => selectedItem.itemCode === item.itemCode)"
                binary
                @change="() => chooseItem(item)"
              /> -->
            </td>
            <td class="align-center">{{ item.itemUniqueCode }}</td>
            <td>{{ item.itemName }}</td>
            <td>{{ item.quantity }}</td>
            <td class="align-right">{{ item.sellingPrice.toLocaleString() }}</td>
            <td class="align-right">{{ item.partSumPrice.toLocaleString() }}</td>
          </tr>
        </template>
        <template v-else>
          <tr>
            <td colspan="7" class="empty-td">주문할 상품을 선택해주세요.</td>
          </tr>
        </template>
      </tbody>
    </AppTableStyled>

    <h4 class="mb-1">교환사유</h4>
    <div class="exchange-reason-container">
      <div v-for="[key, name] in Object.entries(EXCHANGE_REASON)" :key="key" class="exchange-reason-item">
        <RadioButton v-model="selectedReason" :input-id="key" name="exchangeReason" :value="name" />
        <label :for="key">{{ formatKoExchangeReason(name) }}</label>
      </div>
    </div>

    <h4 class="mb-1">교환사유 설명</h4>
    <textarea v-model="explanation" class="exchange-reason-textarea" placeholder="교환사유를 입력하세요"></textarea>

    <h4 class="mb-1">첨부파일</h4>
    <div>
      <Button size="small" label="파일 선택" variant="outlined" severity="secondary" @click="chooseFiles" />
      <input ref="inputRef" type="file" accept="image/*" multiple style="display: none" @change="changeFiles" />

      <div v-if="previewUrls.length > 0" class="uploaded-area">
        <div v-for="(url, index) in previewUrls" :key="index">
          <img :src="url" alt="업로드 된 이미지" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import dayjs from 'dayjs';
import { useToast } from 'primevue';
import { ref, onMounted, watch, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

import AppModalBody from '@/components/common/AppModalBody.vue';
import AppTableStyled from '@/components/common/AppTableStyled.vue';
import FCExchangeApi from '@/utils/api/FCExchangeApi';
import HQExchangeApi from '@/utils/api/HQExchangeApi';
import { EXCHANGE_REASON, SEARCH_CRITERIA } from '@/utils/constant';
import ExcelManager from '@/utils/ExcelManager';
import { formatKoExchangeReason } from '@/utils/format';

const router = useRouter();
const toast = useToast();

const totalElements = ref(0);
const page = ref(0);
const size = ref(15);

const availableOrders = ref([]); // 교환요청 가능한 주문 목록
const availableItems = ref([]); // 선택한 주문의 상품 목록

const selectedOrder = ref(null); // 선택한 주문
const selectedReason = ref(null);
const selectedItems = ref([]);

const previewUrls = ref([]);
const imageFiles = ref([]);
const inputRef = ref(null);

const explanation = ref(null);
const sumPrice = ref(null);

const getInitialCriteria = () => ({
  startDate: dayjs().subtract(1, 'year').toDate(),
  endDate: new Date(),
  criteria: SEARCH_CRITERIA.EXCHANGE_CODE,
  keyword: '',
});

const criteria = ref(getInitialCriteria());
const fcExchangeApi = new FCExchangeApi();
// const searchOptions = computed(() => {
//   return CRITERIA_HQ_EXCHANGE_LIST.map(e => makeSelectOption(formatKoSearchCriteria(e), e));
// });

const chooseItem = data => {
  console.log('*** this is data: ', data.itemCode);
  const index = selectedItems.value.findIndex(item => item.itemCode === data.itemCode);
  if (index !== -1) {
    console.log('*** delete data: ', data.itemCode);
    selectedItems.value = selectedItems.value.filter(item => item.itemCode !== data.itemCode); // 제거
    sumPrice.value -= data.partSumPrice;
  } else {
    console.log('*** add data: ', data.itemCode);
    // selectedItems.value.push({ ...data, itemCode: data.itemCode });
    selectedItems.value.push({ itemCode: data.itemCode });
    sumPrice.value += data.partSumPrice;
  }
};

const chooseFiles = () => {
  console.log('*** image!');
  inputRef.value?.click();
  console.log('*** inputRef.value: ', inputRef.value);
};

const changeFiles = event => {
  const { files } = event.target;
  if (files.length > 0) {
    // 기존 파일 지우고
    previewUrls.value = [];
    imageFiles.value = [];

    // 새로운 파일로 교체
    Array.from(files).forEach(file => {
      imageFiles.value.push(file);
      previewUrls.value.push(URL.createObjectURL(file));
    });
  }
};

const getAvailableOrders = async () => {
  try {
    const rawOrders = await fcExchangeApi.getAvailableOrders();
    availableOrders.value = rawOrders.map(order => ({
      value: order,
      label: `주문 ${order}`,
    }));
  } catch (error) {
    console.error('주문 목록 조회 중 오류:', error);
  }
};

const checkForm = () => {
  try {
    if (!selectedOrder.value) throw new Error('교환신청할 주문을 선택해주세요.');
    if (selectedItems.value.length == 0) throw new Error('교환신청할 상품을 선택해주세요.');
    if (!selectedReason.value) throw new Error('교환사유를 선택해주세요.');
    if (!explanation.value) throw new Error('교환사유 설명을 입력해주세요.');
    // if (sumPrice.value == 0) throw new Error('교환금액 합계가 계산되지 않았습니다.');
    if (imageFiles.value.length == 0) throw new Error('교환상품 이미지를 첨부해주세요.');

    return true;
  } catch (e) {
    toast.add({ severity: 'error', summary: '입력 확인', detail: e.message, life: 3000 });
    return false;
  }
};

const saveExchange = () => {
  const isPass = checkForm();
  if (!isPass) return;

  console.log('*** selectedOrder.value: ', selectedOrder.value);
  console.log('*** selectedItems.value: ', selectedItems.value);
  console.log('*** selectedReason.value: ', selectedReason.value);
  console.log('*** explanation.value: ', explanation.value);
  console.log('*** sumPrice.value: ', sumPrice.value);
  console.log('*** imageFiles.value: ', imageFiles.value);

  fcExchangeApi
    .createExchange({
      orderCode: selectedOrder.value,
      exchangeItemList: selectedItems.value,
      reason: selectedReason.value,
      explanation: explanation.value,
      sumPrice: sumPrice.value,
      images: imageFiles.value,
    })
    .then(() => {
      dialogRef.value.close({
        reload: true,
      });
    });
};

onMounted(async () => {
  // await getExchanges();
  await getAvailableOrders();
});

onUnmounted(() => {
  // 남아있는 리소스 정리
  previewUrls.value.forEach(url => URL.revokeObjectURL(url));
});

// 선택한 주문코드가 바뀌면 주문상품도 변경됨
watch(selectedOrder, () => {
  console.log('** changed!!');
  // Api 호출
  fcExchangeApi
    .getAvailableItems({
      orderCode: selectedOrder.value,
    })
    .then(data => {
      console.log('** availableItems: ', data);
      availableItems.value = data;
      selectedItems.value = []; // 선택한 상품 초기화
    });
});
</script>

<style scoped>
.exchange-search {
  .criteria.use-date {
    grid-column: 1 / 7;
  }
}

.exchange-detail-container {
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
      margin-left: auto;
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

  .uploaded-area {
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    gap: 20px;

    img {
      width: 250px;
      height: 250px;
      object-fit: contain;
    }
  }
}

/* 컨테이너를 Flex로 설정 */
.exchange-reason-container {
  display: flex;
  flex-wrap: wrap; /* 여러 줄로 배치되도록 설정 */
  gap: 16px; /* 항목 간 간격 */
  justify-content: flex-start; /* 왼쪽 정렬 */
  align-items: center;
}

/* 각 항목을 Flex로 설정 */
.exchange-reason-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
}

/* 라디오 버튼 스타일 */
.exchange-reason-item input[type='radio'] {
  accent-color: #007bff;
}

/* 텍스트 입력창 스타일링 */
.exchange-reason-textarea {
  width: 100%;
  height: 120px;
  padding: 10px;
  border: 1px solid #ddd;
  font-size: 16px;
  transition:
    border-color 0.3s ease,
    box-shadow 0.3s ease;
}

/* 텍스트 영역에 포커스 시 효과 */
.exchange-reason-textarea:focus {
  border-color: #007bff; /* 포커스 시 테두리 색상 변경 */
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.3); /* 포커스 시 그림자 효과 */
  outline: none; /* 기본 포커스 외곽선 제거 */
}

/* 플레이스홀더 스타일 */
.exchange-reason-textarea::placeholder {
  color: #888; /* 플레이스홀더 텍스트 색상 */
  font-style: italic; /* 기울임꼴 */
}
</style>
