import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../components/Home.vue'
import PdfConverter from '../components/PdfConverter.vue'

const routes = [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/pdf-converter',
      name: 'pdf-converter',
      component: PdfConverter
    }
  ];
  const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
  });

export default router;
