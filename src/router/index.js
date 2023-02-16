import {createRouter, createWebHistory} from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    meta: {layout: 'main'},
    component: () => import('../views/HomePage'),
  },
  {
    path: '/movie/:id',
    name: 'ShowMovie',
    meta: {layout: 'main'},
    component: () => import('../views/MoviePage'),
  },
  {
    path: '/today',
    name: 'today',
    meta: {layout: 'main'},
    component: () => import('../views/TodayPage'),
  },
  {
    path: '/contacts',
    name: 'contacts',
    meta: {layout: 'main'},
    component: () => import('../views/ContactsPage'),
  },
  {
    path: '/login',
    name: 'login',
    meta: {layout: 'empty'},
    component: () => import('../components/AppLogin')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    meta: {login: 'empty'},
    component: () => import('../views/NotFound'),
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
