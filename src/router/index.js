import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import FrontPage from '@/components/FrontPage'
import SaveTrans from '@/components/SaveTrans.vue'
import ShowTrans from '@/components/ShowTransactions'

Vue.use(Router)
/* eslint-disable */

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
    {
      path: '/',
      name: 'Iorta Wallet',
      component: FrontPage
    },
    {
      path: '/newtrans',
      name: 'Add New Transaction',
      component: SaveTrans
    },
    {
      path: '/showtrans',
      name: 'Transaction History',
      component: ShowTrans
    }
  ]
})
