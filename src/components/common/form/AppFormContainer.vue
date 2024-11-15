<template>
  <div class="app-input-container">
    <label v-if="label">{{ label }}</label>
    <slot></slot>
  </div>
</template>

<script setup>
const { label } = defineProps({
  label: {
    type: String,
    required: false,
    default: '',
  },
});
</script>

<style scoped>
.app-input-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;

  label {
    font-size: 14px;
  }
}
</style>
