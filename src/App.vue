<template>
  <div id="app">
     <!--router-link to="savetrans">New Transaction</router-link-->
    <!--router-link to="showtrans">Show Transactions</router-link-->
    <router-view/>
    <!--test-app></test-app-->
  </div>
</template>

<script>
/* eslint-disable */ 
import testapp from "./components/SaveTrans"

export default {
  name: 'App',
  components:{
    "test-app":testapp
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
