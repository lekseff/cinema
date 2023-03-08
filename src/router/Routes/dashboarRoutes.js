// Routes админки
export const dashboardRoutes = [
  {
    path: '/dashboard',
    name: 'dashboard',
    meta: {layout: 'dashboard', requiredAuth: true},
    component: () => import('@/views/dashboard/IndexPage'),
    children: [
      {
        path: 'halls',
        name: 'indexHalls',
        component: () => import('@/views/dashboard/halls/IndexPage'),
        children: [
          {
            path: 'control',
            name: 'controlHalls',
            component: () => import('@/views/dashboard/halls/HallsControlPage')
          },
          {
            path: 'settings',
            name: 'settingsHalls',
            component: () => import('@/views/dashboard/halls/HallsSettingsPage'),
            children: [
              {
                path: ':id',
                name: 'settingHall',
                component: () => import('@/views/dashboard/halls/HallSettingPage')
              }
            ]
          }
        ]
      },
      {
        path: 'movies',
        name: 'indexMovies',
        component: () => import('@/views/dashboard/movies/IndexPage'),
        children: [
          {
            path: 'all',
            name: 'allMovies',
            component: () => import('@/views/dashboard/movies/MoviesPage')
          },
          {
            path: 'create',
            name: 'createMovie',
            component: () => import('@/views/dashboard/movies/MovieCreatePage')
          }
        ]
      },
      {
        path: 'sessions',
        name: 'indexSessions',
        component: () => import('@/views/dashboard/sessions/IndexPage'),
        children: [
          {
            path: 'all',
            name: 'allSessions',
            component: () => import('@/views/dashboard/sessions/SessionsPage')
          },
          {
            path: 'create',
            name: 'createSessions',
            component: () => import('@/views/dashboard/sessions/SessionCreate')
          }
        ]
      },
      {
        path: 'slider',
        name: 'indexSlider',
        component: () => import('@/views/dashboard/slider/IndexPage'),
        children: [
          {
            path: 'control',
            name: 'controlSlider',
            component: () => import('@/views/dashboard/slider/SliderControl')
          },
          {
            path: 'create',
            name: 'createSlider',
            component: () => import('@/views/dashboard/slider/SliderCreate')
          }
        ]
      }
    ]
  }
]
