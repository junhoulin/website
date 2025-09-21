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
    path: '/home',
    name: 'Home',
    component: Index
  },
  {
    path: '/shop',
    name: 'Shop',
    component: Shop
  },
  {
    path: '/product-list',
    name: 'ProductList',
    component: ProductList
  },
  {
    path: '/wholesale',
    name: 'Wholesale',
    component: () => import('../page/wholesale.vue')
  },
  {
    path: '/brand',
    name: 'Brand',
    component: () => import('../page/brand.vue')
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('../page/contact.vue')
  }
]

const router = createRouter({
  history: createWebHistory('/website/'),
  routes
})

export default router
