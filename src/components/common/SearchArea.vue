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
  box-shadow: var(--p-primary-100) 0px 2px 8px 0px;

  /* grid 영역 설정 */
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
}
</style>
