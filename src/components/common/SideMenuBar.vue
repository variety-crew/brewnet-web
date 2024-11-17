<template>
  <aside class="side-menu">
    <div v-for="menu in sideMenus" :key="menu.label" class="menu-group">
      <h4>{{ menu.label }}</h4>
      <nav>
        <RouterLink
          v-for="menuItem in menu.items"
          :key="menuItem.label"
          :to="{ name: menuItem.routerName }"
          active-class="sidebar-link-active"
          >{{ menuItem.label }}</RouterLink
        >
      </nav>
    </div>
  </aside>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import AppMenu from '@/router/AppMenu';

const route = useRoute();
const appMenu = new AppMenu();

const sideMenus = computed(() => {
  return appMenu.getSideMenus(route.name);
});
</script>

<style scoped>
.side-menu {
  height: fit-content;
  border: 1px solid var(--p-content-border-color);
  background-color: var(--p-content-background);
  min-width: 150px;
  flex-shrink: 0;

  .menu-group {
    & + & {
      margin-top: 16px;
    }

    h4,
    a {
      padding: 10px;
    }

    nav {
      display: flex;
      flex-direction: column;

      a {
        color: var(--p-button-text-plain-color);

        &.sidebar-link-active {
          background-color: var(--p-primary-50);
          color: var(--p-primary-600);
        }

        &:hover {
          background-color: var(--p-button-text-plain-hover-background);
        }
      }
    }
  }
}
</style>
