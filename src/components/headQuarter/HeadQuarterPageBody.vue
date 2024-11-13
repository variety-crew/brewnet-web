<template>
  <div class="page-body">
    <!-- side bar -->
    <HeadQuarterSideMenuBar />

    <main>
      <Breadcrumb :home="home" :model="breadcrumbs" />
      <h2>{{ currentPageTitle }}</h2>
      <div class="content">
        <RouterView />
      </div>
    </main>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import HeadQuarterSideMenuBar from './HeadQuarterSideMenuBar.vue';
import AppMenu from '@/utils/AppMenu';
import { useRoute } from 'vue-router';

const route = useRoute();
const appMenu = new AppMenu();

const currentPageTitle = computed(() => {
  return appMenu.getPageTitle(route.name);
});

const breadcrumbs = computed(() => {
  const matchedRoutes = route.matched;
  return matchedRoutes
    .filter(e => e.meta.breadcrumb)
    .map(e => ({
      label: e.meta.breadcrumb,
    }));
});

const home = ref({
  icon: 'pi pi-home',
});
</script>

<style scoped>
.page-body {
  flex-grow: 1;
  display: flex;
  gap: 16px;

  main {
    flex-grow: 1;
    height: 100%;
    background-color: white;
    overflow-y: auto;
    border: 1px solid var(--p-content-border-color);

    h2 {
      margin: 0 14px;
      padding-left: 10px;
      border-left: 5px solid var(--p-primary-600);
    }

    .content {
      margin-top: 24px;
      padding: 0 14px;
    }
  }
}
</style>
