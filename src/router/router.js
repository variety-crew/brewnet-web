import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '@/stores/user';

/**
 * meta: {
 *   requiresAuth: true, // 인증이 필요한 페이지
 *   guestOnly: true,    // 로그인한 사용자는 접근할 수 없는 페이지
 * }
 */

const routes = [
  {
    path: '/auth/login',
    name: 'Login',
    component: () => import('@/views/auth/LoginView.vue'),
    meta: {
      guestOnly: true,
    },
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('@/views/NotFound.vue') },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) return savedPosition;
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      };
    }
    return { top: 0 };
  },
});

// 내비게이션 가드
router.beforeEach((to, from) => {
  const userStore = useUserStore();

  // 로그인이 완료된 유저라면
  if (to.meta.guestOnly && userStore.accessToken) {
    // to.name !== 'Home'을 통해 무한 리다이렉션 방지
    return {
      name: 'Home',
    };
  }

  // 인증이 필요한 페이지인지 확인
  // (나머지 페이지는 모두 인증이 필요한 페이지)
  if (to.meta.requiresAuth && !userStore.accessToken) {
    return {
      name: 'Login',
    };
  }
});

export default router;
