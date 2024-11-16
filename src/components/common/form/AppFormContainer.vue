<template>
  <form class="app-form-container" @submit.prevent="onFormSubmit">
    <slot></slot>
    <Button type="submit" variant="outlined" label="저장" />
  </form>
</template>

<script setup>
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
