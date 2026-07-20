import type { RouteRecordRaw } from 'vue-router'

// Single-page marketing site. Navigation targets in-page sections via anchor
// hashes (see TheHeader). vite-ssg pre-renders one static HTML file per route.
export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/Home.vue'),
  },
]
