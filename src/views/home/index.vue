<template>
  <div class="home-view">
    <TypeNav />
    <List />
    <Recommend />
    <Rank/>
    <Like />
    <Floor/>
    <Floor/>
    <Brand />
  </div>
</template>

<script>
import List from './components/List'
import Recommend from './components/Recommend'
import Like from './components/Like'
import Rank from './components/Rank'
import Floor from './components/Floor'
import Brand from './components/Brand'

export default {
  name: 'HomeView',
  components: { List, Recommend, Like, Rank, Floor, Brand }
}
</script>

<style lang="scss" scoped>

</style>
