import { createRouter, createWebHistory } from 'vue-router'
import AboutView from "@/components/AboutView";

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../components/HelloWorld')
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
