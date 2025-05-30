import { createRouter, createWebHistory } from 'vue-router'
import { getRoutes } from './routes'

const router = createRouter({
  history: createWebHistory(),
  routes: getRoutes(),
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    else {
      return { top: 0, left: 0 }
    }
  },
})

export default router
