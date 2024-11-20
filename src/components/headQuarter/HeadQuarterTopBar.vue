<template>
  <AppNavbar class="hq-navbar">
    <template #start>
      <RouterLink :to="{ name: 'hq:home' }">
        <img src="@/assets/images/logo.png" alt="Logo" class="logo" />
      </RouterLink>
    </template>

    <template #end>
      <nav>
        <div class="menu-btn">
          <Button
            v-for="menu in topBarMenus"
            :key="menu.label"
            :label="menu.label"
            variant="text"
            severity="secondary"
            as="router-link"
            :to="{ name: menu.routerName }"
            active-class="topbar-link-active"
          />
        </div>

        <div class="user">
          <p>{{ userStore.username }}</p>
          <Button
            type="button"
            icon="pi pi-chevron-down"
            aria-haspopup="true"
            aria-controls="overlay_menu"
            aria-label="User Menu"
            variant="text"
            raised
            severity="secondary"
            size="small"
            @click="toggleUserMenu"
          />

          <Menu id="overlay_menu" ref="userMenu" :model="userMenus" :popup="true" />
        </div>

        <OverlayBadge severity="danger" value="4">
          <Button icon="pi pi-bell" severity="secondary" variant="outlined" rounded aria-label="Notification" />
        </OverlayBadge>
      </nav>
    </template>
  </AppNavbar>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

import { useAppConfirmModal } from '@/hooks/useAppConfirmModal';
import AppMenu from '@/router/AppMenu';
import { useUserStore } from '@/stores/user';

import AppNavbar from '../common/AppNavbar.vue';

const appMenu = new AppMenu();

const userStore = useUserStore();
const router = useRouter();
const { showConfirm } = useAppConfirmModal();

const userMenu = ref();
const userMenus = ref([
  { label: '내 정보', icon: 'pi pi-user', command: clickMyPage },
  {
    label: '로그아웃',
    icon: 'pi pi-sign-out',
    command: clickLogout,
  },
]);
const topBarMenus = computed(() => {
  return appMenu.getHqTopBarMenus();
});

const toggleUserMenu = event => {
  userMenu.value.toggle(event);
};

const handleLogout = () => {
  userStore.logout();
  router.replace({ name: 'auth:login' });
};

function clickLogout() {
  showConfirm({
    header: '로그아웃',
    message: `로그아웃을 진행합니다.`,
    acceptLabel: '로그아웃',
    onAccept: handleLogout,
  });
}

function clickMyPage() {
  router.push({ name: 'hq:my' });
}
</script>

<style scoped>
.hq-navbar {
  .logo {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: contain;
  }

  nav {
    display: flex;
    align-items: center;
    gap: 10px;

    a.topbar-link-active {
      color: var(--p-primary-600);
      border-bottom: 2px solid var(--p-primary-600);
    }

    .user {
      display: flex;
      align-items: center;
      gap: 5px;
    }
  }
}
</style>
