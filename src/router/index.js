import {createRouter, createWebHistory} from 'vue-router'
import store from "@/store";

const routes = [
  {
    path: '/',
    name: 'home',
    meta: {layout: 'main'},
    component: () => import('../views/HomePage'),
  },
  {
    path: '/movie/:id',
    name: 'showMovie',
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
    component: () => import('../views/LoginPage')
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    meta: {layout: 'dashboard', requiredAuth: true},
    component: () => import('../views/dashboard/IndexPage'),
    children: [
      {
        path: 'halls',
        name: 'indexHalls',
        component: () => import('../views/dashboard/halls/IndexPage'),
        children: [
          {
            path: 'control',
            name: 'controlHalls',
            component: () => import('../views/dashboard/halls/HallsControlPage')
          },
          {
            path: 'settings',
            name: 'settingsHalls',
            component: () => import('../views/dashboard/halls/HallsSettingsPage'),
            children: [
              {
                path: ':id',
                name: 'settingHall',
                component: () => import('../views/dashboard/halls/HallSettingPage')
              }
            ]
          }
        ]
      },
      {
        path: 'movies',
        name: 'indexMovies',
        component: () => import('../views/dashboard/movies/IndexPage'),
        children: [
          {
            path: 'all',
            name: 'allMovies',
            component: () => import('../views/dashboard/movies/MoviesPage')
          },
          {
            path: 'create',
            name: 'createMovie',
            component: () => import('../views/dashboard/movies/MovieCreatePage')
          }
        ]
      },
      {
        path: 'sessions',
        name: 'indexSessions',
        component: () => import('../views/dashboard/sessions/IndexPage'),
        children: [
          {
            path: 'all',
            name: 'allSessions',
            component: () => import('../views/dashboard/sessions/SessionsPage')
          },
          {
            path: 'create',
            name: 'createSessions',
            component: () => import('../views/dashboard/sessions/SessionCreate')
          }
        ]
      },
      {
        path: 'slider',
        name: 'indexSlider',
        component: () => import('../views/dashboard/slider/IndexPage'),
        children: [
          {
            path: 'control',
            name: 'controlSlider',
            component: () => import('../views/dashboard/slider/SliderControl')
          },
          {
            path: 'create',
            name: 'createSlider',
            component: () => import('../views/dashboard/slider/SliderCreate')
          }
        ]
      }
    ]
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
