<template>
  <div class="search-view">
    <!-- 分类导航 -->
    <TypeNav></TypeNav>
    <!--list-content-->
    <div class="main">
        <div class="py-container">
            <!-- 面包屑 -->
            <Bread :searchQuery="searchQuery" />
            <!-- 筛选 选择 -->
            <Selector @changeTrademark="changeTrademark" @changeAttrs="changeAttrs"/>
            <!--商品列表-->
            <div class="details clearfix">
                <div class="sui-navbar">
                    <div class="navbar-inner filter">
                        <ul class="sui-nav">
                            <li class="active">
                                <a href="#">综合</a>
                            </li>
                            <li>
                                <a href="#">销量</a>
                            </li>
                            <li>
                                <a href="#">新品</a>
                            </li>
                            <li>
                                <a href="#">评价</a>
                            </li>
                            <li>
                                <a href="#">价格⬆</a>
                            </li>
                            <li>
                                <a href="#">价格⬇</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="goods-list">
                    <ul class="yui3-g">
                        <li class="yui3-u-1-5" v-for="goods in goodsList" :key="goods.id">
                            <div class="list-wrap">
                                <div class="p-img">
                                    <a><img :src="goods.defaultImg" /></a>
                                </div>
                                <div class="price">
                                    <strong>
                                        <em>¥</em>
                                        <i> {{goods.price.toFixed(2)}}</i>
                                    </strong>
                                </div>
                                <div class="attr">
                                    <a :title="goods.title" v-html="goods.title"></a>
                                </div>
                                <div class="commit">
                                    <i class="command">已有<span>{{goods.id}}</span>人评价</i>
                                </div>
                                <div class="operate">
                                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <!-- 分页器 -->
                <Pagination />
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import Bread from './components/Bread'
import Pagination from './components/Pagination'
import Selector from './components/Selector'
import { mapGetters } from 'vuex'

export default {
  name: 'SearchView',
  components: { Bread, Pagination, Selector },
  data () {
    return {
      // 搜索参数
      searchQuery: {
        props: [], // 属性
        trademark: undefined // 品牌
      }
    }
  },
  computed: {
    ...mapGetters('search', ['goodsList'])
  },
  watch: {
    // 监听 $route的改变 （监听路由的改变）
    $route: {
      handler () {
        // 1 设置搜索参数 将查询字符串对象与路由对象合并到搜索参数中
        this.searchQuery = { ...this.searchQuery, ...this.$route.query, ...this.$route.params }
        // 2. 调用函数获取查询结果
        this.getSearch()
      },
      immediate: true
    }
  },
  methods: {
    // 获取搜索结果
    getSearch () {
      this.$store.dispatch('search/getSearchInfo', this.searchQuery)
    },
    // 品牌更改
    changeTrademark (trademark) {
      // 1. 设置品牌搜索参数   品牌ID:品牌名
      this.searchQuery.trademark = `${trademark.tmId}:${trademark.tmName}`
      // 2. 调用函数搜索结果
      this.getSearch()
    },
    // 属性更改
    changeAttrs ({ id, value, name }) {
      // 1. 将属性值组成 需要的格式  id:value:name
      const attrs = `${id}:${value}:${name}`
      // 1.1 判断属性值 是否已经存在
      if (this.searchQuery.props.includes(attrs)) return
      // 2. 将改好的属性值 添加到属性组中
      this.searchQuery.props.push(attrs)
      // 3. 调用函数 获取搜索结果
      this.getSearch()
    }
  }
}
</script>

<style lang="scss" scoped>
.main{
  margin: 10px 0;
  .py-container{
      width: 1200px;
      margin: 0 auto;

      .details{
          margin-bottom: 5px;
          .sui-navbar{
              overflow: visible;
              margin-bottom: 0;
              .filter{
                  min-height: 40px;
                  padding-right: 20px;
                  background: #fbfbfb;
                  border: 1px solid #e2e2e2;
                  padding-left: 0;
                  border-radius: 0;
                  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);
                  .sui-nav{
                      position: relative;
                      left: 0;
                      display: block;
                      float: left;
                      margin: 0 10px 0 0;
                      li{
                          float: left;
                          line-height: 18px;
                          a{
                              display: block;
                              cursor: pointer;
                              padding: 11px 15px;
                              color: #777;
                              text-decoration: none;
                          }
                          &.active{
                              a{
                                  background: #e1251b;
                                  color: #fff;
                              }
                          }
                      }
                  }
              }
          }
          .goods-list{
              margin: 20px 0;
              ul{
                  display:flex;
                  flex-wrap:wrap;
                  li{
                      height: 100%;
                      width: 20%;
                      margin-top: 10px;
                      line-height: 28px;
                      .list-wrap{
                          .p-img{
                              padding-left: 15px;
                              width: 215px;
                              height: 255px;
                              a{
                                  display: block;
                                  max-width: 100%;
                                  height: 100%;
                                  color: #666;
                                  img{
                                      max-width: 100%;
                                      height: 100%;
                                      vertical-align: middle;
                                  }
                              }
                          }
                          .price{
                              padding-left: 15px;
                              font-size: 18px;
                              color: #c81623;
                              strong{
                                  font-weight: 700;
                                  i{
                                      margin-left: -5px;
                                  }
                              }
                          }
                          .attr{
                              padding-left: 15px;
                              width: 85%;
                              overflow: hidden;
                              margin-bottom: 8px;
                              min-height: 38px;
                              cursor: pointer;
                              line-height: 1.8;
                              display: -webkit-box;
                              -webkit-box-orient: vertical;
                              -webkit-line-clamp: 2;
                              a{
                                  color: #333;
                                  text-decoration: none;
                              }
                          }
                          .commit{
                              padding-left: 15px;
                              height: 22px;
                              font-size: 13px;
                              color: #a7a7a7;
                              span{
                                  font-weight: 700;
                                  color: #646fb0;
                              }
                          }
                          .operate{
                              padding: 12px 15px;
                              .sui-btn{
                                  display: inline-block;
                                  padding: 2px 14px;
                                  box-sizing: border-box;
                                  margin-bottom: 0;
                                  font-size: 12px;
                                  line-height: 18px;
                                  text-align: center;
                                  vertical-align: middle;
                                  cursor: pointer;
                                  border-radius: 0;
                                  background-color: transparent;
                                  margin-right: 15px;
                              }
                              .btn-bordered{
                                  min-width: 85px;
                                  background-color: transparent;
                                  border: 1px solid #8c8c8c;
                                  color: #8c8c8c;
                                  &:hover{
                                      border: 1px solid #666;
                                      color: #fff!important;
                                      background-color: #666;
                                      text-decoration: none;
                                  }
                              }
                              .btn-danger{
                                  border: 1px solid #e1251b;
                                  color: #e1251b;
                                  &:hover{
                                      border: 1px solid #e1251b;
                                      background-color: #e1251b;
                                      color:white!important;
                                      text-decoration: none;
                                  }
                              }
                          }
                      }
                  }
              }
          }
      }
  }
}
</style>
