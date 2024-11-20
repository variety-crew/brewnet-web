<template>
  <table class="app-table-styled" :class="{ full: fullWidth }">
    <slot></slot>
  </table>
</template>

<script setup>
const { fullWidth } = defineProps({
  fullWidth: {
    type: Boolean,
    required: false,
    default: false,
  },
});
</script>

<style scoped>
.app-table-styled {
  border-spacing: 0;
  border-collapse: collapse;

  &.full {
    width: 100%;
  }

  :slotted(th) {
    background-color: var(--p-surface-100);
    padding: 5px 10px;
  }

  :slotted(td) {
    padding: 5px 10px;
    border: 1px solid var(--p-surface-200);
  }
}
</style>
