<template>
  <!--下方的缩略图-->
  <div class="specScroll">
    <!--左按钮-->
    <a class="prev" @click="prevImage">&lt;</a>
    <!-- 中间可滑动区域 -->
    <div class="items">
      <div class="itemsCon" :style="{ left: moveIndex * -76 + 'px' }">
        <img
          :class="{active: activeIndex === index}"
          :src="skuImage.imgUrl"
          v-for="skuImage, index in skuInfo.skuImageList"
          :key="skuImage.id"
          @mouseenter="changeIndex(index)"
        />
      </div>
    </div>
    <!--右按钮-->
    <a class="next" @click="nextImage">&gt;</a>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ImageList',
  data () {
    return {
      // 移动索引
      moveIndex: 0,
      // 选中索引
      activeIndex: 0
    }
  },
  computed: {
    ...mapGetters('detail', ['skuInfo'])
  },
  methods: {
    // 移动图片列表
    nextImage () {
      // 图片总数量
      const img_length = this.skuInfo.skuImageList.length
      // 移动到最后一张时 取消增加
      if (img_length - 5 === this.moveIndex || img_length <= 5) return
      // 增加移动索引
      this.moveIndex++
    },
    // 移动图片列表
    prevImage () {
      if (this.moveIndex === 0) return
      // 减少移动索引
      this.moveIndex--
    },
    // 更改选中图片
    changeIndex (index) {
      this.activeIndex = index
      // 将当前选中图片 提交到vuex中
      this.$store.commit('detail/SET_IMG', this.skuInfo.skuImageList[index].imgUrl)
    }
  }
}
</script>

<style lang="scss" scoped>
.specScroll {
  margin-top: 5px;
  width: 400px;
  overflow: hidden;
  .prev,
  .next {
    text-align: center;
    width: 10px;
    height: 54px;
    line-height: 54px;
    border: 1px solid #ccc;
    background: #ebebeb;
    cursor: pointer;
    user-select: none;
  }
  .prev {
    float: left;
    margin-right: 4px;
  }
  .next {
    float: right;
  }
  .items {
    float: left;
    position: relative;
    width: 372px;
    height: 56px;
    overflow: hidden;
    .itemsCon {
      position: absolute;
      width: 9999px;
      height: 56px;
      left: 0;
      transition: all 0.5s ease 0s;
      img {
        float: left;
        text-align: center;
        border: 1px solid #ccc;
        padding: 2px;
        width: 56px;
        height: 56px;
        margin-right: 20px;
        box-sizing: border-box;
        &.active {
          border: 2px solid red;
        }
      }
    }
  }
}
</style>
