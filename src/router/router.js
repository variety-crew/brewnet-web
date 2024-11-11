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
    path: '/auth',
    name: 'auth:index',
    component: () => import('@/views/AuthIndexView.vue'),
    meta: {
      guestOnly: true,
    },
    children: [
      {
        path: 'login',
        name: 'auth:login',
        component: () => import('@/views/auth/LoginView.vue'),
      },
    ],
  },

  // 본사 화면
  {
    path: '/hq',
    name: 'hq:index',
    component: () => import('@/views/HeadQuarterIndexView.vue'),
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: 'home',
        name: 'hq:home',
        component: () => import('@/views/headQuarter/HomeView.vue'),
      },
    ],
  },

  // 가맹점 화면
  {
    path: '/fc',
    name: 'fc:index',
    component: () => import('@/views/FranchiseeIndexView.vue'),
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: 'home',
        name: 'fc:home',
        component: () => import('@/views/franchisee/HomeView.vue'),
      },
    ],
  },

  // 배송기사 화면
  {
    path: '/d',
    name: 'd:index',
    component: () => import('@/views/DeliveryIndexView.vue'),
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: 'home',
        name: 'd:home',
        component: () => import('@/views/delivery/HomeView.vue'),
      },
    ],
  },

  { path: '/:pathMatch(.*)*', name: '404', component: () => import('@/views/NotFound.vue') },
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

  // 로그인이 완료된 유저가 guestOnly에 접근한 경우
  if (userStore.accessToken && to.meta.guestOnly) {
    if (userStore.userType === 'hq') {
      // 본사 계정이라면
      return {
        name: 'hq:home',
      };
    }

    if (userStore.userType === 'fc') {
      // 가맹점 계정이라면
      return {
        name: 'fc:home',
      };
    }

    if (userStore.userType === 'd') {
      // 배송 계정이라면
      return {
        name: 'd:home',
      };
    }
  }

  // 인증이 필요한 페이지인지 확인
  // (나머지 페이지는 모두 인증이 필요한 페이지)
  if (to.meta.requiresAuth && !userStore.accessToken) {
    return {
      name: 'auth:login',
    };
  }
});

export default router;
