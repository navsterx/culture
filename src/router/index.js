// Composables
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => {
      if (window.location.hostname === 'www.awesomeculture.co.uk' || window.location.hostname === 'www.awesomeculture.io') {
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
        component: () => import('@/views/Home.vue'),
      },
      {
        path: '/about',
        name: 'About',
        component: () => import('@/views/About.vue'),
      },
      {
        path: '/company/:vanityUrl',
        name: 'Company',
        component: () => import('@/views/Company.vue'),
      },
      {
        path: '/listed',
        name: 'Get Listed',
        component: () => import('@/views/Listed.vue'),
      },
    ],
  },
  {
    path: '/admin',
    component: () => import('@/layouts/admin/Default.vue'),
    children: [
      {
        path: '/admin',
        name: 'AdminDashboard',
        component: () => import('@/views/admin/Dashboard.vue'),
      },
      // Add more admin routes here
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
