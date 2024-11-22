<template>
  <form class="search-area-form" @submit.prevent="onSubmit">
    <div
      class="search-area"
      :class="{ grid }"
      :style="{
        gridTemplateColumns: `repeat(${gridRepeatCount}, ${gridRepeatWidth})`,
      }"
    >
      <slot></slot>
    </div>

    <Button type="submit" label="조회" icon="pi pi-search" size="small" fluid />
  </form>
</template>

<script setup>
const { grid, gridRepeatCount, gridRepeatWidth } = defineProps({
  grid: {
    type: Boolean,
    required: false,
    default: false,
  },
  gridRepeatCount: {
    type: [Number, null],
    required: false,
    default: 6,
  },
  gridRepeatWidth: {
    type: String,
    required: false,
    default: '1fr',
  },
});
const emit = defineEmits(['search']);

const onSubmit = () => {
  emit('search');
};
</script>

<style scoped>
.search-area-form {
  padding: 16px;
  border-radius: 5px;
  border: 1px solid var(--p-surface-300);
  margin-bottom: 32px;
  box-shadow: var(--p-primary-100) 0px 2px 8px 0px;

  .search-area {
    margin-bottom: 20px;

    &.grid {
      display: grid;
      gap: 16px;
    }
  }
}
</style>
