import { createRouter, createWebHistory } from 'vue-router'
import Shop from '../page/shop.vue'
import Index from '../page/index1.vue'
import ProductList from '../page/product-list.vue'

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/shop',
    name: 'Shop',
    component: Shop
  },
  {
    path: '/products',
    name: 'ProductList',
    component: ProductList
  }
]

const router = createRouter({
  history: createWebHistory('/website/'),
  routes
})

export default router
