<template>
  <div>
    <div class="add-button-wrapper">
      <Button label="카테고리 추가" icon="pi pi-plus" size="small" @click="clickAddCategory" />
    </div>

    <ItemCategoryGroup
      v-for="categoryGroup in categoryGroupList"
      :key="categoryGroup.superCategoryCode"
      :category-group="categoryGroup"
      class="mb-8"
      @save-category="onSave"
      @remove-category="onRemove"
    />

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
import ItemCategoryGroup from '@/components/headQuarter/ItemCategoryGroup.vue';
import { useAppConfirmModal } from '@/hooks/useAppConfirmModal';
import CategoryApi from '@/utils/api/CategoryApi';
import { makeSelectOption } from '@/utils/helper';

const { showConfirm } = useAppConfirmModal();
const toast = useToast();

const categoryGroupList = ref([]);
const showAddCategoryModal = ref(false);
const addingCategoryName = ref('');
const selectedSuperCategory = ref('');
const superCategoryList = ref([]);
const superCategoryOptions = computed(() => {
  return superCategoryList.value.map(e => makeSelectOption(e, e));
});

const categoryApi = new CategoryApi();

const getCategories = () => {
  categoryApi.getCategories().then(data => {
    const arrangedCategories = []; // [{ superCategoryCode: number, superCategoryName: string, subCategories: []}];

    data.forEach(category => {
      const founded = arrangedCategories.find(e => e.superCategoryCode === category.superCategoryCode);
      const insertSubCategory = {
        subCategoryCode: category.subCategoryCode,
        subCategoryName: category.subCategoryName,
      };

      if (founded && founded.subCategories) {
        // 이미 추가했다면 더 추가
        founded.subCategories.push(insertSubCategory);
      } else {
        // 새로 추가하는 거라면
        arrangedCategories.push({
          superCategoryCode: category.superCategoryCode,
          superCategoryName: category.superCategoryName,
          subCategories: [insertSubCategory],
        });
      }
    });

    categoryGroupList.value = arrangedCategories;
  });
};

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
  getCategories();

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
