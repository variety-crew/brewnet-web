<template>
  <div>
    <ItemCategoryList
      title="비식품"
      :categories="nonFoodCategories"
      class="mb-8"
      @save-category="onSave"
      @remove-category="onRemove"
    />
    <ItemCategoryList title="식품" :categories="foodCategories" @save-category="onSave" @remove-category="onRemove" />
  </div>
</template>

<script setup>
import { useToast } from 'primevue';
import { onMounted, ref } from 'vue';

import ItemCategoryList from '@/components/headQuarter/ItemCategoryList.vue';
import { useAppConfirmModal } from '@/hooks/useAppConfirmModal';
import { mockupFoodItemCategories, mockupNonFoodItemCategories } from '@/utils/mockup';

const { showConfirm } = useAppConfirmModal();
const toast = useToast();

const nonFoodCategories = ref([]);
const foodCategories = ref([]);

const onSave = targetCategory => {
  // 카테고리 저장 API
  toast.add({ severity: 'success', summary: '처리 성공', detail: '카테고리명이 수정되었습니다.', life: 3000 });
};

const removeCategory = targetCategory => {
  // 카테고리 삭제 API
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

onMounted(() => {
  nonFoodCategories.value = [...mockupNonFoodItemCategories];
  foodCategories.value = [...mockupFoodItemCategories];
});
</script>

<style scoped></style>
