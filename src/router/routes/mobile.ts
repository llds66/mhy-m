import type { RouteRecordRaw } from 'vue-router'

const Layout = () => import('@/layouts/index.vue')

export const mobileRoutes: Array<RouteRecordRaw> = [
  {
    name: 'mobile-layout',
    path: '/',
    redirect: 'home',
    component: Layout,
    children: [
      {
        name: 'Home',
        meta: { nav: true, navName: '首页', navIcon: 'i-iconamoon-home-light' },
        path: 'home',
        component: () => import('@pages/mobile-pages/home/index.vue'),
      },
      {
        name: 'Other',
        meta: { nav: true, navName: '其他', navIcon: 'i-iconamoon-home-light' },
        path: 'other',
        component: () => import('@pages/mobile-pages/other/index.vue'),
      },
    ],
  },
]
