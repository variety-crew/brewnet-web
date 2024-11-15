<template>
  <div class="search-area">
    <slot></slot>
  </div>
</template>

<script setup></script>

<style scoped>
.search-area {
  padding: 16px;
  border-radius: 5px;
  border: 1px solid var(--p-surface-300);
  margin-bottom: 32px;
}
</style>
