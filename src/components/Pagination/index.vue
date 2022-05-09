<template>
  <!-- 前二不变  后二不变  -->
  <!--  1* 2  3  4  5 -->
  <!--  1  2*  3  4  5 -->
  <!--  1  2  3*  4  5 -->
  <!--  2  3  4*  5  6 -->
  <!--  3  4  5*  6  7 -->
  <!--  3  4  5   6* 7 -->
  <!--  3  4  5   6  7* -->
  <!--  6  7  8  9  10 -->
  <div class="fr page">
    <!-- 第一页禁止跳转 -->
    <button :class="{ disable: page == 1 }" :disabled="page == 1" @click="$emit('pageChange', page - 1)">上一页</button>

    <!-- 首页 -->
    <button v-if="pageStartAndEnd.start > 1"  @click="$emit('pageChange', 1)">1</button>
    <!-- 更多页 -->
    <button v-if="pageStartAndEnd.start > 2">...</button>

    <!-- 根据 开始页 与 结束页 循环页码 -->
    <template v-for="i in pageStartAndEnd.end">
      <button
        :class="{ active: i === page }"
        :key="i"
        v-if="i >= pageStartAndEnd.start"
        @click="$emit('pageChange', i)"
      >
      {{i}}
      </button>
    </template>

    <!-- 更多页 -->
    <button v-if="pageStartAndEnd.end  < totalPage - 1">...</button>
    <!-- 尾页 -->
    <button v-if="pageStartAndEnd.end < totalPage"  @click="$emit('pageChange', totalPage)">
      {{totalPage}}
    </button>
    <!-- 最后一页禁止跳转 -->
    <button :class="{ disable: page == totalPage }" :disabled="page == totalPage" @click="$emit('pageChange', page + 1)">下一页</button>
    <button class="total">{{total}}条</button>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    // 总数量
    total: Number,
    // 每页数量
    pageSize: Number,
    // 当前页码
    page: Number
  },
  computed: {
    // 计算总页数 = 总数量 / 每页数量  向上取整 有小数则进1
    totalPage () {
      return Math.ceil(this.total / this.pageSize)
    },
    // 一次性只显示5页  低于5页 显示总页数
    // 计算开始页码 - 结束页码
    pageStartAndEnd () {
      let start = 0, end = 0
      // 判断总页数是否低于5页
      if (this.totalPage <= 5) {
        start = 1
        end = this.totalPage
      } else {
        start = this.page - 2
        end = this.page + 2
        // 处理边界 start小于1
        if (start <= 1) {
          start = 1; end = 5
        }
        // 处理边界 end大于总页数
        if (end >= this.totalPage) {
          start = this.totalPage - 4; end = this.totalPage
        }
      }
      return { start, end }
    }
  }

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
