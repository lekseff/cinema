import {createRouter, createWebHistory} from 'vue-router'
import store from '@/store'
import {webRoutes} from '@/router/Routes/webRoutes'
import {dashboardRoutes} from '@/router/Routes/dashboarRoutes'


const routes = [
  ...webRoutes,
  ...dashboardRoutes
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('x-xsrf-token')
  if (to.matched.some(record => record.meta.requiredAuth)) {
    if (!token) {
      next({name: 'login'});
      return;
    }
  }

  if(to.name === 'login' && store.getters.getAuthStatus) {
    return next({name: 'dashboard'})
  }

  next();
})

export default router
