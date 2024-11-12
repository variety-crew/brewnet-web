<template>
  <aside class="side-menu">
    <Menu :model="sideMenus">
      <template #item="{ item, props }">
        <router-link v-slot="{ href, navigate }" :to="{ name: item.routerName }" custom>
          <a v-ripple :href="href" v-bind="props.action" aria-hidden="false" @click="navigate">
            <span>{{ item.label }}</span>
          </a>
        </router-link>
      </template>
    </Menu>
  </aside>
</template>

<script setup>
import AppMenu from '@/utils/AppMenu';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const sideMenus = computed(() => {
  const appMenu = new AppMenu();

  // 발주 Sub Menus
  if (route.name.includes('hq:order-out')) {
    return appMenu.getOrderOutSideMenus();
  }

  return [];
});
</script>

<style scoped>
.side-menu {
}
</style>
