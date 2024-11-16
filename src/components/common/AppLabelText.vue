<template>
  <div class="app-label-text-container">
    <label>{{ label }}</label>
    <p>{{ text }}</p>
  </div>
</template>

<script setup>
const {} = defineProps({
  label: {
    type: String,
    required: true,
  },

  text: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
.app-label-text-container {
  display: flex;
  flex-direction: column;
  gap: 5px;

  label {
    font-size: 14px;
    color: var(--p-surface-600);
  }
}
</style>
