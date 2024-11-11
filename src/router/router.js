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
    name: 'login',
    component: () => import('@/views/auth/LoginView.vue'),
    meta: {
      guestOnly: true,
    },
  },
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/AboutView.vue'),
  },
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
    return {
      name: 'home',
    };
  }

  // 나머지 라우터는 무조건 로그인 필수
  if (to.name !== 'login' && !userStore.accessToken) {
    // to.name !== 'login'을 통해 무한 리다이렉션 방지
    return {
      name: 'login',
    };
  }
});

export default router;
