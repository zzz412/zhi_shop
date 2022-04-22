<template>
  <!--放大镜效果-->
  <div class="preview">
    <div class="jqzoom">
      <img :src="activeImg" />
    </div>
    <!-- 遮罩 -->
    <div class="mask_view" @mousemove="moveMask"></div>
    <div class="mask" ref="mask"></div>
    <!-- 大图 -->
    <div class="maxbox">
      <img :src="activeImg" ref="big">
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Zoom',
  computed: {
    ...mapState('detail', ['activeImg'])
  },
  methods: {
    // 移动遮罩
    moveMask (e) {
      const maskRef = this.$refs.mask
      const big = this.$refs.big
      // 获取鼠标在div中的位置
      let x = e.offsetX - maskRef.offsetWidth / 2
      let y = e.offsetY - maskRef.offsetHeight / 2
      // 判断x与y边界值
      if (x <= 0) x = 0
      if (x > maskRef.offsetWidth) x = maskRef.offsetWidth
      if (y < 0) y = 0
      if (y > maskRef.offsetHeight) y = maskRef.offsetHeight
      // 设置遮罩位置
      maskRef.style.left = x + 'px'
      maskRef.style.top = y + 'px'
      // 设置大图位置
      big.style.left = x * -2 + 'px'
      big.style.top = y * -2 + 'px'
    }
  }
}
</script>

<style lang="scss" scoped>
 .preview {
  width: 400px;
  height: 400px;
  border: 1px solid #dfdfdf;
  position: relative;
  .jqzoom {
    cursor: pointer;
    width: 400px;
    height: 400px;
    position: relative;
    img {
      width: 100%;
    }
  }
  .mask_view {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 10;
    cursor: move;
    &:hover ~ .mask,
    &:hover ~ .maxbox {
      display: block;
    }
  }
  .mask {
    width: 200px;
    height: 200px;
    background: rgba(0, 0, 0, 0.2);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }
  .maxbox {
    width: 400px;
    height: 400px;
    position: absolute;
    left: 420px;
    top: 0px;
    overflow: hidden;
    z-index: 20;
    display: none;
    border: 1px solid #ddd;
    img {
      width: 800px;
      height: 800px;
      display: block;
      position: absolute;
      left: 0;
      top: 0;
    }
  }
}
</style>
