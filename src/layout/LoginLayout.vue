<template>
  <div class="layout-view">
    <AppHeader />
    <router-view></router-view>
    <AppCopyright />
  </div>
</template>

<script>
import AppHeader from './components/AppHeader'
import AppCopyright from './components/AppCopyright'

export default {
  name: 'LoginLayout',
  components: { AppHeader, AppCopyright }
}
</script>

<style lang="scss" scoped>

</style>
