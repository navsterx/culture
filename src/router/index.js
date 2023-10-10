// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => {
      if (window.location.hostname === 'www.awesomeculture.co.uk') {
        // If the hostname is 'www.awesomeculture.co.uk', use the 'coming soon' layout
        return import('@/layouts/default/ComingSoon.vue');
      } else {
        // For other hostnames, use the 'default' layout
        return import('@/layouts/default/Default.vue');
      }
    },
    children: [
      {
        path: '/',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
      },
      {
        path: '/about',
        name: 'About',
        component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue'),
      },
      {
        path: '/company/:vanityUrl',
        name: 'Company',
        component: () => import(/* webpackChunkName: "company" */ '@/views/Company.vue'),
      },
      {
        path: '/listed',
        name: 'Get Listed',
        component: () => import(/* webpackChunkName: "listed" */ '@/views/Listed.vue'),
      },
    ],
  },
];


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
