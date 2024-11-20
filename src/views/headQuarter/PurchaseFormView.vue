<template>
  <div>
    <AppAutoComplete
      v-model="selectedSupplier"
      label="거래처 선택"
      :suggestions="supplierSuggestions"
      placeholder="거래처명이나 거래처 코드로 검색"
      full-width
      @complete-input="onCompleteInput"
    />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';

import AppAutoComplete from '@/components/common/form/AppAutoComplete.vue';
import { makeAutocompleteSuggestion } from '@/utils/helper';
import { mockupSuppliers } from '@/utils/mockup';

const selectedSupplier = ref(null);
const filteredSuppliers = ref([]);
const supplierSuggestions = computed(() => {
  return filteredSuppliers.value.map(e => makeAutocompleteSuggestion(e.code, `#${e.code} ${e.name}`));
});

const onCompleteInput = event => {
  if (!event.query) return;
  filteredSuppliers.value = mockupSuppliers.filter(
    e => e.code.toString().includes(event.query) || e.name.includes(event.query),
  );
};
</script>

<style scoped></style>
