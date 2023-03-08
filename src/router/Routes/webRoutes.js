// Routes сайта
export const webRoutes = [
  {
    path: '/',
    name: 'home',
    meta: {layout: 'main'},
    component: () => import('@/views/HomePage'),
  },
  {
    path: '/movie/:id',
    name: 'showMovie',
    meta: {layout: 'main'},
    component: () => import('@/views/MoviePage'),
  },
  {
    path: '/today',
    name: 'today',
    meta: {layout: 'main'},
    component: () => import('@/views/TodayPage'),
  },
  {
    path: '/contacts',
    name: 'contacts',
    meta: {layout: 'main'},
    component: () => import('@/views/ContactsPage'),
  },
  {
    path: '/login',
    name: 'login',
    meta: {layout: 'empty'},
    component: () => import('@/views/LoginPage')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    meta: {login: 'empty'},
    component: () => import('@/views/NotFound'),
  }
]
