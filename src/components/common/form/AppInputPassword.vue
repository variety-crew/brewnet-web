<template>
  <AppFormField :label="label">
    <Password
      :value="modelValue"
      :name="name"
      :placeholder="placeholder"
      :feedback="false"
      toggle-mask
      size="small"
      @input="onChangeInput"
    />
  </AppFormField>
</template>

<script setup>
import AppFormField from './AppFormField.vue';

const { label, modelValue, name, placeholder } = defineProps({
  label: {
    type: String,
    required: false,
    default: '',
  },
  modelValue: {
    type: String,
    required: true,
  },
  name: {
    type: [String, null],
    required: false,
    default: null,
  },
  placeholder: {
    type: String,
    required: false,
    default: '',
  },
});

const emit = defineEmits(['update:modelValue']);

function onChangeInput(event) {
  emit('update:modelValue', event.target.value);
}
</script>

<style scoped></style>
