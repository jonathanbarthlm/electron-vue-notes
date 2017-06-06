import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'notes-wrapper',
      component: require('@/components/NotesWrapper')
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
