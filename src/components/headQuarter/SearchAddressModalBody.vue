<template>
  <AppModalBody
    action-button-label="선택 완료"
    class="search-address-modal-body-container"
    @click-action-button="choose"
  >
    <AppRadioList v-model="selectedSearchType" name="address-search-type" :options="searchTypes" class="mb-3" />
    <AppInputText
      v-model="searchKeyword"
      :placeholder="selectedSearchType === 'byAddress' ? '예: 보라매로 87' : '예: OO카페 서울역점'"
      :icon="isLoading ? `pi pi-spin pi-spinner` : undefined"
      icon-position="end"
      full-width
      class="mb-8"
    />

    <div class="result-area">
      <div class="top">
        <p>검색결과</p>
        <p>총 {{ options.length }}건</p>
      </div>
      <Listbox v-if="options.length > 0" v-model="selectedAddress" :options="options">
        <template #option="slotProps">
          <div class="result-item">
            <h3>{{ slotProps.option.title }}</h3>
            <small>
              {{ slotProps.option.desc }}
            </small>
          </div>
        </template>
      </Listbox>
      <p v-else class="empty">검색 결과가 없습니다.</p>
    </div>
  </AppModalBody>
</template>

<script setup>
import { computed, inject, ref, watch } from 'vue';

import { makeRadioOption } from '@/utils/helper';

import AppModalBody from '../common/AppModalBody.vue';
import AppInputText from '../common/form/AppInputText.vue';
import AppRadioList from '../common/form/AppRadioList.vue';

const emit = defineEmits(['callbackEvent', 'cancel']);

const dialogRef = inject('dialogRef');

const searchKeyword = ref('');
const selectedAddress = ref();
const searchResults = ref([]);
const options = computed(() => {
  // 일반 주소검색, 키워드로 주소검색 둘 다 호환
  return searchResults.value.map(e => ({
    title: e.place_name || e.address_name,
    x: e.x,
    y: e.y,
    desc: e.place_name
      ? e.address_name
      : `[도로명]${e.road_address?.address_name || ''}\n[지번] ${e.address?.address_name || ''}`,
  }));
});
const searchTypes = ref([
  makeRadioOption('지번/도로명으로 검색', 'byAddress', 'byAddress'),
  makeRadioOption('장소명으로 검색', 'byPlaceName', 'byPlaceName'),
]);
const selectedSearchType = ref('byAddress');
const isLoading = ref(false);

let debounce = null;

const choose = () => {
  // emit('cancel', selectedAddress);
  // emit('cancel', { user: 'primetime' });
  // dialogRef.value.close();
};

const searchAddress = async query => {
  const endpoint =
    selectedSearchType.value === 'byAddress'
      ? `https://dapi.kakao.com/v2/local/search/address`
      : 'https://dapi.kakao.com/v2/local/search/keyword';

  isLoading.value = true;
  const response = await fetch(`${endpoint}?query=${query}`, {
    headers: {
      Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_REST_API_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`);
  }

  isLoading.value = false;
  const { documents } = await response.json();
  searchResults.value = documents;
};

watch(searchKeyword, newVal => {
  if (debounce) {
    clearTimeout(debounce);
  }

  if (newVal) {
    debounce = setTimeout(() => {
      searchAddress(newVal);
    }, 500);
  }
});

watch(selectedSearchType, () => {
  searchKeyword.value = '';

  // 검색 전에 라디오 버튼이 변경된 경우 timer clear
  if (debounce) {
    clearTimeout(debounce);
  }
});
</script>

<style scoped>
.search-address-modal-body-container {
  .result-area {
    .top {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
    }

    .empty {
      border: 1px solid var(--p-surface-300);
      border-radius: 5px;
      padding: 16px;
    }

    .result-item {
      display: flex;
      flex-direction: column;

      small {
        white-space: pre-wrap;
      }
    }
  }
}
</style>
