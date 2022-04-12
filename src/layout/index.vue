<template>
  <div class="layout-view">
    <AppHeader />
    <router-view></router-view>
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from './components/AppHeader'
import AppFooter from './components/AppFooter'

export default {
  name: 'Layout',
  components: { AppHeader, AppFooter }
}
</script>

<style lang="scss" scoped>

</style>
