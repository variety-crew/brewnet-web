<template>
  <table class="app-table-styled">
    <slot></slot>
  </table>
</template>

<script setup></script>

<style scoped>
.app-table-styled {
  border-spacing: 0;
  border-collapse: collapse;

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
