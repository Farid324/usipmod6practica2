import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CategoriasView from '../views/CategoriasView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/categorias',
    name: 'categorias',
    component: CategoriasView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router