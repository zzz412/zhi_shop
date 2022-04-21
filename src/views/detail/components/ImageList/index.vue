<template>
  <!--下方的缩略图-->
  <div class="specScroll">
    <!--左按钮-->
    <a class="prev">&lt;</a>
    <!-- 中间可滑动区域 -->
    <div class="items">
      <div class="itemsCon" style="transition: all 0.5s ease 0s">
        <img src="@/assets/images/s1.png" /><img
          src="@/assets/images/s2.png"
        />
      </div>
    </div>
    <!--右按钮-->
    <a class="next">&gt;</a>
  </div>
</template>

<script>
export default {
  name: 'ImageList'
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
      img {
        float: left;
        text-align: center;
        border: 1px solid #ccc;
        padding: 2px;
        width: 50px;
        height: 50px;
        margin-right: 20px;
      }
    }
  }
}
</style>
