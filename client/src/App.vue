<template>
  <div>
    <Menu msg=""/>
    <router-view class="m-2" :key="$route.path">

    </router-view>
  </div>

</template>

<script>
import Menu from './components/Menu.vue'
import "bootstrap/dist/css/bootstrap.min.css";
export default {
  name: 'App',
  components: {
    Menu
  }
}
</script>

<style lang="sass">
@import "assets/scss/main.scss"

</style>
