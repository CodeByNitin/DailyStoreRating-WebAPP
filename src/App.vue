<template>
  <div id="app">
      <transition name="page" mode="out-in">
        <router-view></router-view>
      </transition>
  </div>
</template>

<script>
import 'vuetify/dist/vuetify.min.css'
export default {
  name: 'app'
}
</script>

<style>
.page-enter-active, .page-leave-active {
  transition: opacity 0.7s, transform 0.7s;
}
.page-enter, .page-leave-to {
  opacity: 0;
  transform: translateX(-30%);
}
#app {
  background-color: #ffffff
}
</style>
