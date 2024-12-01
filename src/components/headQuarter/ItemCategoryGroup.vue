<template>
  <div>
    <h2 class="mb-3">{{ categoryGroup.superCategoryName }}</h2>
    <ul class="category-list">
      <li
        v-for="subCategory in categoryGroup.subCategories"
        :key="subCategory.subCategoryCode"
        @mouseenter="() => onMouseEnter(subCategory.subCategoryCode)"
        @mouseleave="onMouseLeave"
      >
        <div v-if="editCategoryCode === subCategory.subCategoryCode" class="edit-area">
          <AppInputText v-model="editingText" />
          <Button label="저장" size="small" @click="clickSave" />
          <Button rounded icon="pi pi-times" size="small" variant="text" @click="offEditMode" />
        </div>
        <p v-else>{{ subCategory.subCategoryName }}</p>

        <div class="overlay" :class="{ show: mouseEnterCategoryCode === subCategory.subCategoryCode }">
          <Button label="수정" size="small" severity="secondary" @click="clickEdit(subCategory)" />
          <Button label="삭제" size="small" severity="danger" @click="clickRemove(subCategory)" />
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue';

import AppInputText from '../common/form/AppInputText.vue';

const { categoryGroup } = defineProps({
  categoryGroup: {
    type: Object,
    required: true,
  },
});
const emit = defineEmits(['saveCategory', 'removeCategory']);

const mouseEnterCategoryCode = ref(null);
const editMode = ref(false);
const editCategoryCode = ref(null);
const editingText = ref('');

const onMouseEnter = targetCode => {
  if (editCategoryCode.value === targetCode) return; // 이미 수정모드인 category item에 mouse enter 들어오면 무시

  mouseEnterCategoryCode.value = targetCode;
};

const onMouseLeave = () => {
  mouseEnterCategoryCode.value = null;
};

const clickEdit = targetCategory => {
  mouseEnterCategoryCode.value = null;

  editMode.value = true;
  editCategoryCode.value = targetCategory.subCategoryCode;
  editingText.value = targetCategory.subCategoryName;
};

const clickRemove = targetCategory => {
  emit('removeCategory', targetCategory);
};

const clickSave = () => {
  emit('saveCategory', editCategoryCode.value, editingText);
};

const offEditMode = () => {
  editCategoryCode.value = null;
  editingText.value = '';
  editMode.value = false;
};
</script>

<style scoped>
.category-list {
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  li {
    position: relative;
    padding: 0 16px;
    height: 60px;
    border-radius: 5px;
    border: 1px solid var(--p-surface-300);
    box-shadow: var(--p-primary-100) 0px 2px 8px 0px;
    min-width: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    align-items: center;
    gap: 10px;
    background-color: rgba(0, 0, 0, 0.25);
    width: 100%;
    height: 100%;
    border-radius: 5px;

    display: none;
    justify-content: center;
    align-items: center;

    &.show {
      display: flex;
    }
  }

  .edit-area {
    display: flex;
    align-items: center;
    gap: 10px;
  }
}
</style>
