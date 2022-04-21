<template>
  <!--放大镜效果-->
  <div class="preview">
    <div class="jqzoom">
      <img src="@/assets/images/s1.png" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Zoom'
}
</script>

<style lang="scss" scoped>
 .preview {
  width: 400px;
  height: 400px;
  border: 1px solid #dfdfdf;
  .jqzoom {
    cursor: pointer;
    width: 400px;
    height: 400px;
    position: relative;
    img {
      width: 100%;
    }
    .mask {
      width: 200px;
      height: 200px;
      background: rgba(255, 255, 255, 0.5);
      position: absolute;
      left: 0;
      top: 0;
      border: 1px solid #ddd;
    }
  }
  .maxbox {
    width: 400px;
    height: 400px;
    position: absolute;
    left: 420px;
    top: 0px;
    overflow: hidden;
    z-index: 20;
    border: 1px solid #ddd;
    img {
      width: 800px;
      height: 800px;
      display: block;
    }
  }
}
</style>
