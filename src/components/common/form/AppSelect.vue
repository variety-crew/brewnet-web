<template>
  <Select
    :options="options"
    :value="modelValue"
    :default-value="initialValue"
    option-label="label"
    option-value="value"
    v-bind="$attrs"
    size="small"
    checkmark
    placeholder="===선택해주세요==="
    :highlight-on-select="false"
    @change="onSelectChange"
  />

  <!--   
  v-bind="$attrs": 부모에게서 전달된 추가 속성을 수용
   -->
</template>

<script setup>
const { modelValue, options, initialValue } = defineProps({
  // 부모로부터 현재 선택된 값을 받아옴
  modelValue: {
    type: String,
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
});

const emit = defineEmits(['update:modelValue']);

// 선택이 변경될 때 상위 컴포넌트로 새로운 값 전달
function onSelectChange(event) {
  emit('update:modelValue', event.value);
}
</script>

<style scoped></style>
