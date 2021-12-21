import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Pedido from '../views/Pedido.vue'
import Car from '../views/Car.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/pedido',
    name: 'Pedido',
    component: Pedido
  },
  {
    path: '/car',
    name: 'Car',
    component: Car
  }
 
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
