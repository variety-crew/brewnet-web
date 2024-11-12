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
      {
        path: 'order-out',
        name: 'hq:order-out',
        component: () => import('@/components/common/PageBody.vue'),
        meta: {
          breadcrumb: '발주',
        },
        children: [
          {
            path: 'list',
            name: 'hq:order-out:list',
            component: () => import('@/views/headQuarter/OrderOutListView.vue'),
            meta: {
              breadcrumb: '발주 내역 조회',
            },
          },
          {
            path: 'form',
            name: 'hq:order-out:form',
            component: () => import('@/views/headQuarter/OrderOutFormView.vue'),
            meta: {
              breadcrumb: '발주 입력',
            },
          },
          {
            path: 'stock-arrival',
            name: 'hq:order-out:stock-arrival',
            component: () => import('@/views/headQuarter/OrderOutStockArrivalListView.vue'),
            meta: {
              breadcrumb: '입고 확인',
            },
          },
        ],
      },
      {
        path: 'order-in',
        name: 'hq:order-in',
        component: () => import('@/components/common/PageBody.vue'),
      },
      {
        path: 'partner',
        name: 'hq:partner',
        component: () => import('@/components/common/PageBody.vue'),
      },
      {
        path: 'stock',
        name: 'hq:stock',
        component: () => import('@/components/common/PageBody.vue'),
      },
      {
        path: 'approval',
        name: 'hq:approval',
        component: () => import('@/components/common/PageBody.vue'),
      },
      {
        path: 'board',
        name: 'hq:board',
        component: () => import('@/components/common/PageBody.vue'),
      },
      {
        path: 'settings',
        name: 'hq:settings',
        component: () => import('@/components/common/PageBody.vue'),
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
        component: () => import('@/components/common/PageBody.vue'),
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

  // 루트('/')로 접근 시 redirect
  {
    path: '/',
    name: 'index',
    redirect: { name: 'auth:login' },
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

  // 특정 페이지 리다이렉트 처리
  if (to.name === 'hq:order-out') {
    return {
      name: 'hq:order-out:list',
    };
  }
});

export default router;
