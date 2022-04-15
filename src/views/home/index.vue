<template>
  <div class="home-view">
    <TypeNav />
    <List />
    <Recommend />
    <Rank/>
    <Like />
    <!-- 根据楼层数据 渲染楼层组件 -->
    <Floor v-for="floor in floorList" :key="floor.id" :floor="floor" />
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
import { getFloor } from '@/api'

export default {
  name: 'HomeView',
  components: { List, Recommend, Like, Rank, Floor, Brand },
  data () {
    return {
      floorList: []
    }
  },
  async mounted () {
    const res = await getFloor()
    this.floorList = res.data.data
  }
}
</script>

<style lang="scss" scoped>

</style>
