<template>
  <div class="item-form-container">
    <div class="category-area">
      <AppSelect
        v-model="selectedSuperCategory"
        label="카테고리"
        label-position="left"
        :options="superCategoryOptions"
      />
      <AppSelect v-model="selectedSubCategory" :options="subCategoryOptions" />
    </div>

    <AppInputText v-model="itemName" label="품목명" label-position="left" />
    <AppInputNumber v-model="sellingPrice" label="판매단가" label-position="left" krw-currency text-align="right" />
    <AppInputNumber v-model="purchasePrice" label="구매단가" label-position="left" krw-currency text-align="right" />
    <AppAutoComplete
      v-model="selectedCorrespondent"
      label="취급 거래처"
      :suggestions="correspondentSuggestions"
      label-position="left"
      @complete-input="searchCorrespondent"
    />
    <AppInputNumber v-model="safetyStock" label="안전재고값" label-position="left" />
    <AppChooseFile
      label="품목이미지"
      label-position="left"
      :image-urls="previewUrl ? [previewUrl] : []"
      @change-file="onChangeFile"
    />
    <RemovableImage v-if="previewUrl" :image-url="previewUrl" @remove-image="onRemove" />

    <Button label="저장" size="small" @click="clickSave" />
  </div>
</template>

<script setup>
import { useToast } from 'primevue';
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

import AppAutoComplete from '@/components/common/form/AppAutoComplete.vue';
import AppChooseFile from '@/components/common/form/AppChooseFile.vue';
import AppInputNumber from '@/components/common/form/AppInputNumber.vue';
import AppInputText from '@/components/common/form/AppInputText.vue';
import AppSelect from '@/components/common/form/AppSelect.vue';
import RemovableImage from '@/components/common/RemovableImage.vue';
import { useFile } from '@/hooks/useFile';
import HQCorrespondentApi from '@/utils/api/HQCorrespondentApi';
import { makeAutocompleteSuggestion, makeSelectOption } from '@/utils/helper';

const route = useRoute();
const { itemCode } = route.params;
const { previewUrl, file: itemImageFile, onChangeFile, onRemove } = useFile();
const toast = useToast();

const editMode = ref(false);
const superCategories = ref(['NON_FOOD', 'FOOD']);
const superCategoryOptions = computed(() => {
  return superCategories.value.map(e => makeSelectOption(e, e));
});
const subCategories = ref([]); // 선택한 상위 카테고리의 하위 카테고리
const subCategoryOptions = computed(() => {
  return subCategories.value.map(e => makeSelectOption(e, e));
});
const filteredCorrespondents = ref([]);
const correspondentSuggestions = computed(() => {
  return filteredCorrespondents.value.map(e => makeAutocompleteSuggestion(e.correspondentCode, e.correspondentName));
});

const selectedSuperCategory = ref('');
const selectedSubCategory = ref('');
const itemName = ref('');
const sellingPrice = ref(null);
const purchasePrice = ref(null);
const selectedCorrespondent = ref(null);
const safetyStock = ref(null);

const hqCorrespondentApi = new HQCorrespondentApi();

const searchCorrespondent = event => {
  // 가맹점 검색
  hqCorrespondentApi.getCorrespondents({ correspondentName: event.query || undefined }).then(data => {
    filteredCorrespondents.value = data.data;
  });
};

const checkForm = () => {
  try {
    if (!selectedSubCategory.value) throw new Error('상위 카테고리를 선택해주세요.');
    if (!selectedSubCategory.value) throw new Error('하위 카테고리를 선택해주세요.');
    if (!itemName.value) throw new Error('품목명을 입력해주세요.');
    if (!sellingPrice.value) throw new Error('판매단가를 입력해주세요.');
    if (!purchasePrice.value) throw new Error('구매단가를 입력해주세요.');
    if (!selectedCorrespondent.value) throw new Error('취급거래처를 입력해주세요.');
    if (!safetyStock.value) throw new Error('안전재고값을 입력해주세요.');

    return true;
  } catch (e) {
    toast.add({ severity: 'error', summary: '입력 확인', detail: e.message, life: 3000 });
    return false;
  }
};

const clickSave = () => {
  const isPass = checkForm();
  if (!isPass) return;

  // TODO 품목 등록/수정 API
};

watch(
  () => route.params.itemCode,
  newItemCode => {
    if (newItemCode) {
      // 수정모드
      editMode.value = true;

      // TODO 기존 데이터 가져와서 셋팅
    } else {
      // 생성모드
      editMode.value = false;
    }
  },
);
</script>

<style scoped>
.item-form-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 400px;

  .category-area {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .item-image {
    width: 250px;
    height: 250px;
    object-fit: cover;
  }
}
</style>
