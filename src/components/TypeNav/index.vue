<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
      <div class="container">
          <h2 class="all">全部商品分类</h2>
          <nav class="nav">
              <a href="###">服装城</a>
              <a href="###">美妆馆</a>
              <a href="###">智品汇超市</a>
              <a href="###">全球购</a>
              <a href="###">闪购</a>
              <a href="###">团购</a>
              <a href="###">有趣</a>
              <a href="###">秒杀</a>
          </nav>
          <div class="sort">
              <!-- 鼠标移出时 清除activeId -->
              <div class="all-sort-list2" @mouseleave="activeId = null">
                  <!-- 鼠标移入 给移入元素添加 active类名 -->
                  <div
                    class="item"
                    :class="{ active: activeId === cate1.categoryId}"
                    v-for="cate1 in navList"
                    :key="cate1.categoryId"
                    @mouseenter="addActive(cate1.categoryId)"
                  >
                      <h3>
                          <!-- 一级分类 -->
                          <a href="">{{cate1.categoryName}}</a>
                      </h3>
                      <div class="item-list clearfix">
                          <div class="subitem">
                              <dl class="fore" v-for="cate2 in cate1.categoryChild" :key="cate2.categoryId">
                                  <dt>
                                      <!-- 二级分类 -->
                                      <a href="">{{cate2.categoryName}}</a>
                                  </dt>
                                  <dd>
                                      <em v-for="cate3 in cate2.categoryChild" :key="cate3.categoryId">
                                          <!-- 三级分类 -->
                                          <a href="">{{cate3.categoryName}}</a>
                                      </em>
                                  </dd>
                              </dl>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
// 导入API接口函数
import { getCategoryList } from '@/api'
// 按需导入lodash中的节流函数
import { throttle } from 'lodash/function'

export default {
  name: 'TypeNav',
  data () {
    return {
      navList: [], // 导航列表
      activeId: null // 当前移入item的ID
    }
  },
  methods: {
    // 节流操作： 一定时间内只能触发一次
    // 防抖操作： 一定时间内多次触发 只会使用最后一次
    addActive: throttle(function (id) {
      // 移入时将当前item的id保存
      this.activeId = id
    }, 30)
  },
  async mounted () {
    // 调用获取导航分类接口
    const res = await getCategoryList()
    this.navList = res.data.data
  }
}
</script>

<style lang="scss" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
      width: 1200px;
      margin: 0 auto;
      display: flex;
      position: relative;

      .all {
          width: 210px;
          height: 45px;
          background-color: #e1251b;
          line-height: 45px;
          text-align: center;
          color: #fff;
          font-size: 14px;
          font-weight: bold;
      }

      .nav {
          a {
              height: 45px;
              margin: 0 22px;
              line-height: 45px;
              font-size: 16px;
              color: #333;
          }
      }

      .sort {
          position: absolute;
          left: 0;
          top: 45px;
          width: 210px;
          // height: 461px;
          position: absolute;
          background: #fafafa;
          z-index: 999;

          .all-sort-list2 {
              .item {
                  // &:hover {
                  //   background: red;
                  // }
                  &.active {
                    background: #d9d9d9;
                  }
                  h3 {
                      line-height: 30px;
                      font-size: 14px;
                      font-weight: 400;
                      overflow: hidden;
                      padding: 0 20px;
                      margin: 0;

                      a {
                          color: #333;
                      }
                  }

                  .item-list {
                      display: none;
                      position: absolute;
                      width: 734px;
                      min-height: 460px;
                      background: #f7f7f7;
                      left: 210px;
                      border: 1px solid #ddd;
                      top: 0;
                      z-index: 9999 !important;

                      .subitem {
                          float: left;
                          width: 650px;
                          padding: 0 4px 0 8px;

                          dl {
                              border-top: 1px solid #eee;
                              padding: 6px 0;
                              overflow: hidden;
                              zoom: 1;

                              &.fore {
                                  border-top: 0;
                              }

                              dt {
                                  float: left;
                                  width: 54px;
                                  line-height: 22px;
                                  text-align: right;
                                  padding: 3px 6px 0 0;
                                  font-weight: 700;
                              }

                              dd {
                                  float: left;
                                  width: 415px;
                                  padding: 3px 0 0;
                                  overflow: hidden;

                                  em {
                                      float: left;
                                      height: 14px;
                                      line-height: 14px;
                                      padding: 0 8px;
                                      margin-top: 5px;
                                      border-left: 1px solid #ccc;
                                  }
                              }
                          }
                      }
                  }

                  &:hover {
                      .item-list {
                          display: block;
                      }
                  }
              }
          }
      }
  }
}
</style>
