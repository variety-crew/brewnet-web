<template>
  <div class="page-body">
    <!-- side bar -->
    <SideMenuBar />

    <main>
      <Breadcrumb :home="home" :model="items" />
      <h2>{{ currentPageTitle }}</h2>
      <div class="content">
        <RouterView />
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import SideMenuBar from '../common/SideMenuBar.vue';
import AppMenu from '@/utils/AppMenu';
import { useRoute } from 'vue-router';

const route = useRoute();

const currentPageTitle = computed(() => {
  const appMenu = new AppMenu();
  return appMenu.getPageTitle(route.name);
});

const home = ref({
  icon: 'pi pi-home',
});
const items = ref([
  { label: 'Electronics' },
  { label: 'Computer' },
  { label: 'Accessories' },
  { label: 'Keyboard' },
  { label: 'Wireless' },
]);
</script>

<style scoped>
.page-body {
  flex-grow: 1;
  display: flex;
  gap: 16px;
  height: 100%;

  main {
    flex-grow: 1;
    height: 100%;

    .content {
      margin-top: 24px;
    }
  }
}
</style>
