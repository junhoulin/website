import { createRouter, createWebHashHistory } from 'vue-router'
import Shop from '../page/shop.vue'
import Index from '../page/index1.vue'
import ProductList from '../page/product-list.vue'
import ProductDetail from '../page/product-detail.vue'

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
    path: '/product/:id',
    name: 'ProductDetail',
    component: ProductDetail
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
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: () => import('../page/checkout.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
