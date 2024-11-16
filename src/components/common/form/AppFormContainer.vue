<template>
  <form class="app-form-container" @submit.prevent="onFormSubmit">
    <slot></slot>
    <Button type="submit" variant="outlined" :label="submitLabel" />
  </form>
</template>

<script setup>
const { submitLabel } = defineProps({
  submitLabel: {
    type: String,
    required: false,
    default: '저장',
  },
});
const emit = defineEmits(['onSubmit']);
const onFormSubmit = event => {
  emit('onSubmit');
};
</script>

<style scoped>
.app-form-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: fit-content;
}
</style>
