import { createRouter, createWebHistory } from 'vue-router'
import MainView from '../view/main.vue'
import PolicyView from '../view/policy.vue'
import ProductView from '../view/product.vue'
import ProductRelationView from '../view/productRelation.vue'


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
    },
    {
      path: '/product',
      name: 'product',
      component: ProductView
    },
    {
      path: '/productRelation',
      name: 'productRelation',
      component: ProductRelationView
    }
  ]
})

export default router
