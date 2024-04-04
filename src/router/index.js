// Composables
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => {
      return import('@/layouts/default/Default.vue');
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
