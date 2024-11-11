<template>
  <!-- <div>{{ $route.name.startsWith('auth') && 'auth 페이지 입니다.' }}</div>
  <div>{{ $route.name.startsWith('hq') && '본사 페이지 입니다.' }}</div>
  <div>{{ $route.name.startsWith('fc') && '가맹점 페이지 입니다.' }}</div>
  <div>{{ $route.name.startsWith('d') && '배송 페이지 입니다.' }}</div> -->
  <div>{{ $route.name?.startsWith('auth') && 'auth 페이지 입니다.' }}</div>
  <div>
    <RouterView />
  </div>
</template>

<script setup></script>

<style scoped></style>
