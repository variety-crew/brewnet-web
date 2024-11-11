<template>
  <main class="auth-main">
    <RouterView />
  </main>
</template>

<script setup>
import { RouterView } from 'vue-router';
</script>

<style scoped>
main.auth-main {
  height: 100dvh;
  background-color: #f0f2f5;
}
</style>
