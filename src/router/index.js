import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '@/components/HomePage.vue'

const routes = [{
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/components/user/LoginPage.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/components/user/RegisterPage.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/components/user/ProfilePage.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router