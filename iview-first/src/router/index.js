import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Main from '@/components/Main'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: Main
    },
    {
      path:'/pdf',
      name:'pdf',
      component:resolve=>{
        require(['@/components/ToPDF.vue'],resolve)
      }
    },
    {
      path: '/sendpdf',
      name: 'topdf',
      component: resolve => {
        require(['@/components/SendPDF'],resolve)
      }
    }

  ]
})
