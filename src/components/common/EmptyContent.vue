<template>
  <div class="empty-content-container">
    <i class="pi pi-times-circle"></i>
    <p>{{ text }}</p>
    <Button size="small" :label="fallbackLabel" @click="emit('fallback')" />
  </div>
</template>

<script setup>
const { fallbackLabel, text } = defineProps({
  fallbackLabel: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['fallback']);
</script>

<style scoped>
.empty-content-container {
  border-radius: 5px;
  border: 1px solid var(--p-content-border-color);
  padding: 32px 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;

  i {
    font-size: 50px;
    color: var(--p-surface-500);
  }

  p {
    color: var(--p-surface-700);
  }
}
</style>
