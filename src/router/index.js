import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/admin',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue'),
    children: [
      {
        path: 'products',
        name: 'Products',
        component: () => import('../views/back/Products.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'orders',
        name: 'Orders',
        component: () => import('../views/back/Orders.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'coupon',
        name: 'Coupon',
        component: () => import('../views/back/Coupon.vue'),
        meta: { requiresAuth: true }
      },
      {
        path: 'analysis',
        name: 'Analysis',
        component: () => import('../views/back/Analysis.vue'),
        meta: { requiresAuth: true }
      }
    ]
  },
  {
    path: '/back',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue'),
    children: [
      {
        path: 'customer_orders',
        name: 'CustomerOrders',
        component: () => import('../views/back/CustomerOrders.vue')
      },
      {
        path: 'customer_checkout/:order_id',
        name: 'CustomerCheckout',
        component: () => import('../views/back/CustomerCheckout.vue')
      }
    ]
  },
  {
    path: '/',
    component: () => import('../views/Layout.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('../views/front/Home.vue')
      },
      {
        path: 'productlist',
        name: 'Productlist',
        component: () => import('../views/front/Productlist.vue')
      },
      {
        path: 'product_detail/:product_id',
        name: 'Product_detail',
        component: () => import('../views/front/Product_detail.vue')
      },
      {
        path: 'checkorders',
        name: 'CheckOrders',
        component: () => import('../views/front/CheckOrders.vue')
      },
      {
        path: 'billinginfo',
        name: 'Billinginfo',
        component: () => import('../views/front/Billinginfo.vue')
      },
      {
        path: 'checkout/:order_id',
        name: 'Checkout',
        component: () => import('../views/front/Checkout.vue')
      }
    ]
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  linkActiveClass: 'active',
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

export default router
