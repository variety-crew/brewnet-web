<template>
  <div
    class="search-area"
    :class="{ grid }"
    :style="{
      gridTemplateColumns: `repeat(${gridRepeatCount}, ${gridRepeatWidth})`,
    }"
  >
    <slot></slot>
  </div>
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
</script>

<style scoped>
.search-area {
  padding: 16px;
  border-radius: 5px;
  border: 1px solid var(--p-surface-300);
  margin-bottom: 32px;
  box-shadow: var(--p-primary-100) 0px 2px 8px 0px;

  &.grid {
    display: grid;
    gap: 16px;
  }
}
</style>
