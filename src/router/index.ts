// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  // 定义你的路由规则
  {
    path: '/',
    component: () => import('../views/login/index.vue')
  },
  {
    path: '/login',
    redirect: '/'
  },
  // 其他路由...
  {
    path: '/home',
    component: () => import('../main/index.vue')
  },
];

const router = createRouter({
  history: createWebHistory('/'),
  routes
});

export default router;
