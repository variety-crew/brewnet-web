<template>
  <div>
    <div class="add-button-wrapper">
      <Button label="카테고리 추가" icon="pi pi-plus" size="small" @click="clickAddCategory" />
    </div>

    <ItemCategoryList
      title="비식품"
      :categories="nonFoodCategories"
      class="mb-8"
      @save-category="onSave"
      @remove-category="onRemove"
    />
    <ItemCategoryList title="식품" :categories="foodCategories" @save-category="onSave" @remove-category="onRemove" />

    <Dialog
      v-model:visible="showAddCategoryModal"
      modal
      :draggable="false"
      header="품목 카테고리 추가"
      style="width: 50vw"
    >
      <AppSelect v-model="selectedSuperCategory" label="상위카테고리" :options="superCategoryOptions" class="mb-3" />
      <AppInputText v-model="addingCategoryName" label="카테고리명" />

      <template #footer>
        <Button label="저장" @click="clickSaveAdd" />
      </template>
    </Dialog>
  </div>
</template>

<script setup>
import { useToast } from 'primevue';
import { computed, onMounted, ref } from 'vue';

import AppInputText from '@/components/common/form/AppInputText.vue';
import AppSelect from '@/components/common/form/AppSelect.vue';
import ItemCategoryList from '@/components/headQuarter/ItemCategoryList.vue';
import { useAppConfirmModal } from '@/hooks/useAppConfirmModal';
import { makeSelectOption } from '@/utils/helper';
import { mockupFoodItemCategories, mockupNonFoodItemCategories } from '@/utils/mockup';

const { showConfirm } = useAppConfirmModal();
const toast = useToast();

const nonFoodCategories = ref([]);
const foodCategories = ref([]);
const showAddCategoryModal = ref(false);
const addingCategoryName = ref('');
const selectedSuperCategory = ref('');
const superCategoryList = ref([]);
const superCategoryOptions = computed(() => {
  return superCategoryList.value.map(e => makeSelectOption(e, e));
});

const onSave = targetCategory => {
  // TODO 카테고리 수정 API
  toast.add({ severity: 'success', summary: '처리 성공', detail: '카테고리명이 수정되었습니다.', life: 3000 });
};

const removeCategory = targetCategory => {
  // TODO 카테고리 삭제 API
};

const onRemove = targetCategory => {
  showConfirm({
    header: '품목 카테고리 삭제',
    message: `[${targetCategory.categoryName}] 카테고리를 삭제하시겠습니까?`,
    danger: true,
    acceptLabel: '네, 삭제합니다.',
    onAccept: () => removeCategory(targetCategory),
  });
};

const clickAddCategory = () => {
  showAddCategoryModal.value = true;
};

const clickSaveAdd = () => {
  if (!addingCategoryName.value) {
    toast.add({ severity: 'error', summary: '입력 확인', detail: '카테고리명을 입력해주세요.', life: 3000 });
    return;
  }

  // TODO 카테고리 등록 API
  toast.add({ severity: 'success', summary: '처리 성공', detail: '새 카테고리가 등록되었습니다.', life: 3000 });
  showAddCategoryModal.value = false;

  // TODO reload
};

onMounted(() => {
  nonFoodCategories.value = [...mockupNonFoodItemCategories];
  foodCategories.value = [...mockupFoodItemCategories];

  superCategoryList.value = ['NON_FOOD', 'FOOD'];
});
</script>

<style scoped>
.add-button-wrapper {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 32px;
}
</style>
