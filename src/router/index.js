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
    component: () => import('../views/LoginPage')
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    meta: {layout: 'dashboard'},
    component: () => import('../views/dashboard/IndexPage'),
    children: [
      {
        path: 'halls',
        name: 'indexHalls',
        component: () => import('../views/dashboard/Halls/IndexPage'),
        children: [
          {
            path: 'control',
            name: 'controlHalls',
            component: () => import('../views/dashboard/Halls/ControlHallsPage')
          },
          {
            path: 'settings',
            name: 'settingsHalls',
            component: () => import('../views/dashboard/Halls/SettingsHallsPage'),
            children: [
              {
                path: ':id',
                name: 'settingHall',
                component: () => import('../views/dashboard/Halls/SettingHallPage')
              }
            ]
          }
        ]
      },
      {
        path: 'movies',
        name: 'indexMovies',
        component: () => import('../views/dashboard/Movies/IndexPage'),
        children: [
          {
            path: 'all',
            name: 'allMovies',
            component: () => import('../views/dashboard/Movies/MoviesPage')
          },
          {
            path: 'create',
            name: 'createMovie',
            // component: () => import('../views/dashboard/Movies/CreateMoviePage')
            component: () => import('../views/dashboard/Movies/TestLoadFile')
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

export default router
