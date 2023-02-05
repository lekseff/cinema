import {createRouter, createWebHistory} from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomePage'),
  },
  {
    path: '/today',
    name: 'today',
    component: () => import('../views/TodayPage'),
  },
  {
    path: '/contacts',
    name: 'contacts',
    component: () => import('../views/ContactsPage'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../views/NotFound'),
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
