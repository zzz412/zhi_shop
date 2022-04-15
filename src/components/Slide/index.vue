<template>
  <!-- 轮播图容器 -->
  <div
    class="swiper-container"
    ref="mySwiper"
    @mouseenter="swiperData.autoplay.stop()"
    @mouseleave="swiperData.autoplay.start()"
  >
    <!-- 轮播项容器 -->
    <div class="swiper-wrapper">
      <!-- 轮播项 -->
      <div
        class="swiper-slide"
        v-for="item in list"
        :key="item.id"
      >
        <img style="width: 100%; height: 100%;" :src="item.imgUrl" />
      </div>
    </div>
    <!-- 轮播分页器 -->
    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/css/swiper.css'

export default {
  name: 'Slide',
  props: {
    // 轮播的数据
    list: Array
  },
  watch: {
    list: {
      handler () {
        // 初始化轮播图时  轮播图列表数据还没有渲染 ->  this.$nextTick等待页面渲染完成后
        this.$nextTick(() => {
          // eslint-disable-next-line no-new
          this.swiperData = new Swiper(this.$refs.mySwiper, {
            // 设置无缝衔接
            loop: true,
            // 设置自动播放
            autoplay: {
              // 播放间隔
              delay: 3000,
              // 关闭用户操作后 停止轮播
              disableOnInteraction: false
            },
            // 设置轮播效果
            effect: 'fade',
            // 设置分页器
            pagination: {
              // 分页器容器
              el: '.swiper-pagination',
              // 分页器可点击切换
              clickable: true
            }
          })
        })
      },
      immediate: true // 一开始就监听一次
    }
  }
}
</script>

<style lang="scss" scoped>
.swiper-container {
  width: 100%;
  height: 100%;
}
</style>
