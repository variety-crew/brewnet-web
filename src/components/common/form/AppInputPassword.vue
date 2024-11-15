<template>
  <AppFormContainer :label="label">
    <Password
      :value="modelValue"
      :name="name"
      :placeholder="placeholder"
      :feedback="false"
      toggle-mask
      size="small"
      @input="onChangeInput"
    />
    <Message v-if="formSlot && formSlot[name]?.invalid" severity="error" size="small" variant="simple">{{
      formSlot[name]?.error.message
    }}</Message>
  </AppFormContainer>
</template>

<script setup>
import AppFormContainer from './AppFormContainer.vue';

const { label, modelValue, name, formSlot, placeholder } = defineProps({
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
  formSlot: {
    type: Object,
    required: false,
    default: () => null,
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
