import {
  createRouter,
  createWebHashHistory
} from 'vue-router'
import HomePage from '@/components/HomePage.vue'
import LoginPage from '@/components/LoginPage.vue'

const routes = [{
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/components/RegisterPage.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router