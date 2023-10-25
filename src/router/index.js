import { createRouter, createWebHistory } from 'vue-router'
import MainView from '../view/main.vue'
import PolicyView from '../view/policy.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Main',
      component: MainView
    },
    {
      path: '/policy',
      name: 'Policy',
      component: PolicyView
    }
  ]
})

export default router
