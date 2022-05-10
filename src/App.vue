<template>
  <div id="app">
    <!-- <button @click="$store.commit('user/SET_TOKEN', '123123')">点我</button> -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  mounted () {
    // 调用actions获取导航分类
    this.$store.dispatch('home/getNavList')
  }
}
</script>

<style lang="scss"></style>
