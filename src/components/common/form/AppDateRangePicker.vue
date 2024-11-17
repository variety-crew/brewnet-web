<template>
  <AppFormField :label="label">
    <div class="date-range-wrapper"></div>
  </AppFormField>
</template>

<script setup>
import AppFormField from './AppFormField.vue';

const { label, modelValue } = defineProps({
  label: {
    type: String,
    required: false,
    default: '',
  },
  modelValue: {
    type: Array,
    required: true,
    default: () => [null, null],
  },
});

const emit = defineEmits(['update:modelValue']);

const onChangeStart = event => {
  console.log(event);
  // emit('update:modelValue', )
};

const onChangeEnd = event => {
  console.log(event);
};
</script>

<style scoped>
.date-range-wrapper {
  border: 1px solid var(--p-surface-200);
  width: fit-content;
}
</style>
