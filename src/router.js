import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      component: Home,
      redirect: '/editor',
      children: [
        {
          path: '/editor',
          name: 'editor',
          component: () => import('@/views/Editor.vue')
        }
      ]
    }
  ]
})
