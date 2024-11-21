<template>
  <AppFormField :label="label">
    <Select
      :options="options"
      :value="modelValue"
      :default-value="initialValue"
      option-label="label"
      option-value="value"
      size="small"
      checkmark
      placeholder="===선택해주세요==="
      :highlight-on-select="false"
      :name="name"
      @change="onSelectChange"
    />
  </AppFormField>
</template>

<script setup>
import AppFormField from './AppFormField.vue';

const { modelValue, options, initialValue, label, name } = defineProps({
  // 부모로부터 현재 선택된 값을 받아옴
  modelValue: {
    type: [String, Number],
    required: true,
  },

  options: {
    type: Array,
    required: true,
  },

  /**
   * options: [{
   *   label: string
   *   value: string
   * }]
   */

  initialValue: {
    type: String,
    required: false,
    default: '',
  },

  label: {
    type: String,
    required: false,
    default: '',
  },

  name: {
    type: [String, null],
    required: false,
    default: null,
  },
});

const emit = defineEmits(['update:modelValue']);

// 선택이 변경될 때 상위 컴포넌트로 새로운 값 전달
function onSelectChange(event) {
  emit('update:modelValue', event.value);
}
</script>

<style scoped></style>
