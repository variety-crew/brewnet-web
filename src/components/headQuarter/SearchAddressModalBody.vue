<template>
  <AppModalBody action-button-label="선택 완료" @click-action-button="choose">
    <AppInputText v-model="addressKeyword" placeholder="예: OO카페 서울역점" />
    <Listbox v-if="countries.length > 0" v-model="selectedAddress" :options="countries" option-label="name">
      <template #option="slotProps">
        <div>
          <img
            :alt="slotProps.option.name"
            src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png"
            style="width: 18px"
          />
          <div>{{ slotProps.option.name }}</div>
        </div>
      </template>
    </Listbox>
  </AppModalBody>
</template>

<script setup>
import { ref } from 'vue';

import AppModalBody from '../common/AppModalBody.vue';
import AppInputText from '../common/form/AppInputText.vue';

const addressKeyword = ref('');
const selectedAddress = ref();
const countries = ref([
  { name: 'Australia', code: 'AU' },
  { name: 'Brazil', code: 'BR' },
  { name: 'China', code: 'CN' },
  { name: 'Egypt', code: 'EG' },
  { name: 'France', code: 'FR' },
  { name: 'Germany', code: 'DE' },
  { name: 'India', code: 'IN' },
  { name: 'Japan', code: 'JP' },
  { name: 'Spain', code: 'ES' },
  { name: 'United States', code: 'US' },
]);

const choose = () => {};
</script>

<style scoped></style>
