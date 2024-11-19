<template>
  <AppFormField :label="label" :full-width="fullWidth">
    <InputNumber
      :value="modelValue"
      :use-grouping="useGrouping"
      size="small"
      :fluid="fullWidth"
      :placeholder="placeholder"
      @update:model-value="onChangeInput"
    />
  </AppFormField>
</template>

<script setup>
import AppFormField from './AppFormField.vue';

const { label, modelValue, placeholder, fullWidth, useGrouping } = defineProps({
  modelValue: {
    type: Number,
    required: true,
  },

  // required false
  label: {
    type: String,
    required: false,
    default: '',
  },

  placeholder: {
    type: String,
    required: false,
    default: '',
  },
  fullWidth: {
    type: Boolean,
    required: false,
    default: false,
  },

  useGrouping: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const emit = defineEmits(['update:modelValue']);

function onChangeInput(newValue) {
  emit('update:modelValue', newValue);
}
</script>

<style lang="scss" scoped></style>
