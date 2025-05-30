import type { RouteRecordRaw } from 'vue-router'

const Layout = () => import('@/layouts/index.vue')

export const webRoutes: Array<RouteRecordRaw> = [
  {
    name: 'web-layout',
    path: '/',
    component: Layout,
    children: [
      {
        name: 'Home',
        meta: { nav: true, navName: '首页', navIcon: 'i-iconamoon-home-light' },
        path: '',
        component: () => import('@pages/web-pages/index.vue'),
      },
    ],
  },
]
