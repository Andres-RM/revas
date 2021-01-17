const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Index.vue'),
        name: 'home',
        meta: {
          header_transparent: true
        }
      },
      {
        path: '/simulacion',
        component: () => import('pages/simulacion'),
        name: 'simulacion',
        meta: {
          header_reveal: true
        }
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
