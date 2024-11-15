<template>
  <div class="app-input-text-container">
    <label :for="id">{{ label }}</label>
    <InputText :id="id" :value="modelValue" size="small" v-bind="$attrs" @input="onChangeInput" />
  </div>
</template>

<script setup>
const { label, id, modelValue } = defineProps({
  label: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  modelValue: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['update:modelValue']);

function onChangeInput(event) {
  emit('update:modelValue', event.target.value);
}
</script>

<style scoped>
.app-input-text-container {
  display: flex;
  align-items: center;
  gap: 5px;
}
</style>
