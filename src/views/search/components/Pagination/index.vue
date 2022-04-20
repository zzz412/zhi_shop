<template>
  <!-- 前二不变  后二不变  -->
  <!--  1* 2  3  4  5 -->
  <!--  1  2*  3  4  5 -->
  <!--  1  2  3*  4  5 -->
  <!--  2  3  4*  5  6 -->
  <!--  3  4  5*  6  7 -->
  <!--  3  4  5   6* 7 -->
  <!--  3  4  5   6  7* -->
  <div class="fr page">
    <button class="disable">上一页</button>
    <button>1</button>
    <button class="active">2</button>
    <button>3</button>
    <button>4</button>
    <button>5</button>
    <button>下一页</button>
    <button class="total">100条</button>
  </div>
</template>

<script>
export default {
  name: 'Pagination'
}
</script>

<style lang="scss" scoped>
.page {
  width: 733px;
  height: 66px;
  overflow: hidden;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;
    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
    &.disable {
      color: #c0c4cc;
      cursor: not-allowed;
    }
    &.total {
      margin-left: 20px;
    }
  }
}
</style>
