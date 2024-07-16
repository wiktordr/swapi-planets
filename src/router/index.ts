import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import PlanetsView from '@/views/PlanetsView.vue'
import PlanetView from '@/views/PlanetView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/planet-list/:page',
      name: 'planet-list',
      component: PlanetsView,
      props: true
    },
    {
      path: '/planet-details/:id',
      name: 'planet-details',
      component: PlanetView,
      props: true
    },
  ]
})

export default router
