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
        path: 'purchase',
        name: 'hq:purchase',
        component: () => import('@/components/headQuarter/HeadQuarterPageBody.vue'),
        meta: {
          breadcrumb: '발주',
        },
        children: [
          {
            path: 'list',
            name: 'hq:purchase:list',
            component: () => import('@/views/headQuarter/PurchaseListView.vue'),
            meta: {
              breadcrumb: '발주 내역 조회',
            },
          },
          {
            path: 'form',
            name: 'hq:purchase:form',
            component: () => import('@/views/headQuarter/PurchaseFormView.vue'),
            meta: {
              breadcrumb: '발주 입력',
            },
          },
          {
            path: 'stock-arrival',
            name: 'hq:purchase:stock-arrival',
            component: () => import('@/views/headQuarter/PurchaseStockArrivalListView.vue'),
            meta: {
              breadcrumb: '입고 확인',
            },
          },
        ],
      },
      {
        path: 'order',
        name: 'hq:order',
        component: () => import('@/components/headQuarter/HeadQuarterPageBody.vue'),
      },
      {
        path: 'partner',
        name: 'hq:partner',
        component: () => import('@/components/headQuarter/HeadQuarterPageBody.vue'),
      },
      {
        path: 'stock',
        name: 'hq:stock',
        component: () => import('@/components/headQuarter/HeadQuarterPageBody.vue'),
      },
      {
        path: 'approval',
        name: 'hq:approval',
        component: () => import('@/components/headQuarter/HeadQuarterPageBody.vue'),
      },
      {
        path: 'board',
        name: 'hq:board',
        component: () => import('@/components/headQuarter/HeadQuarterPageBody.vue'),
      },
      {
        path: 'settings',
        name: 'hq:settings',
        component: () => import('@/components/headQuarter/HeadQuarterPageBody.vue'),
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
        component: () => import('@/components/headQuarter/HeadQuarterPageBody.vue'),
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
  if (to.meta.requiresAuth && !userStore.accessToken) {
    return {
      name: 'auth:login',
    };
  }

  // 맞지 않은 유저가 방문했을 때 처리
  if (userStore.userType === 'hq' && !to.name.startsWith('hq:')) {
    return { name: 'hq:home' };
  }
  if (userStore.userType === 'fc' && !to.name.startsWith('fc:')) {
    return { name: 'fc:home' };
  }
  if (userStore.userType === 'd' && !to.name.startsWith('d:')) {
    return { name: 'd:home' };
  }

  // 대메뉴 눌렀을 때 default 서브메뉴 선택(리다이렉트 처리)
  if (to.name === 'hq:purchase') {
    return {
      name: 'hq:purchase:list',
    };
  }
});

export default router;
