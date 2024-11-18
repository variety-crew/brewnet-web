<template>
  <div v-if="modelValue === null || modelValue === undefined">허가가 필요한 구역입니다.</div>
  <form v-else-if="modelValue === false" class="authorization-required-area-false" @submit.prevent="onSubmit">
    <h3 class="mb-1">본인확인</h3>
    <p class="mb-5">본인 확인을 위해 현재 비밀번호를 입력해주세요.</p>

    <AppInputPassword v-model="password" placeholder="현재 비밀번호 입력" class="mb-2" full-width />
    <Button type="submit" label="확인" size="small" :disabled="!password" fluid />
  </form>
  <div v-else>
    <!-- 허가된 경우 -->
    <slot></slot>
  </div>
</template>

<script setup>
import { useToast } from 'primevue';
import { ref, watch } from 'vue';

import AppInputPassword from './form/AppInputPassword.vue';

const { modelValue } = defineProps({
  modelValue: {
    type: [Boolean, null],
    required: true,
    default: null,
  },
});

const emit = defineEmits(['update:modelValue']);

const toast = useToast();

const password = ref('');

const onSubmit = () => {
  emit('update:modelValue', true);
};
</script>

<style scoped>
.authorization-required-area-false {
  padding-top: 30px;
  width: fit-content;
}
</style>
