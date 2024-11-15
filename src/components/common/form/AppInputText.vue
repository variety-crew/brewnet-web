<template>
  <AppFormField :label="label">
    <InputText :value="modelValue" size="small" :name="name" :placeholder="placeholder" @input="onChangeInput" />
    <Message v-if="formSlot && formSlot[name]?.invalid" severity="error" size="small" variant="simple">{{
      formSlot[name].error?.message
    }}</Message>
  </AppFormField>
</template>

<script setup>
import AppFormField from './AppFormField.vue';

const { label, modelValue, name, formSlot, placeholder } = defineProps({
  label: {
    type: String,
    required: true,
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
