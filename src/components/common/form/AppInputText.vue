<template>
  <div class="app-input-text-container">
    <label :for="id">{{ label }}</label>
    <InputText :id="id" :value="value" size="small" @input="emit('changeInput', $event)" />
  </div>
</template>

<script setup>
const { label, id, value } = defineProps({
  label: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['changeInput']);
</script>

<style scoped>
.app-input-text-container {
  display: flex;
  align-items: center;
  gap: 5px;
}
</style>
