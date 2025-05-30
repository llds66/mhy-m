import type { RouteRecordRaw } from 'vue-router'

const Layout = () => import('@/layouts/index.vue')

export const desktopRoutes: Array<RouteRecordRaw> = [
  {
    name: 'desktop-layout',
    path: '/',
    redirect: '/home',
    component: Layout,
    children: [
      {
        name: 'Home',
        meta: { nav: true, navName: '首页', navIcon: 'i-iconamoon-home-light' },
        path: 'home',
        component: () => import('@/pages/desktop-pages/index.vue'),
      },
    ],
  },
]
