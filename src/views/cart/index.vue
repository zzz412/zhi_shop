<template>
  <div class="cart-view">
    <TypeNav></TypeNav>
    <!-- 购物车列表 -->
    <div class="cart">
        <h4>全部商品</h4>
        <div class="cart-main">
            <!-- 购物车头部 -->
            <div class="cart-th">
              <div class="cart-th1">全部</div>
              <div class="cart-th2">商品</div>
              <div class="cart-th3">单价（元）</div>
              <div class="cart-th4">数量</div>
              <div class="cart-th5">小计（元）</div>
              <div class="cart-th6">操作</div>
            </div>

            <!-- 购物车内容 -->
            <div class="cart-body">
              <!-- 购物车列表内容 -->
              <ul class="cart-list" v-for="cart in cartList" :key="cart.id">
                  <!-- 勾选框 -->
                  <li class="cart-list-con1">
                    <input type="checkbox" name="chk_list" :checked="cart.isChecked === 1">
                  </li>
                  <!-- 商品图片与商品名 -->
                  <li class="cart-list-con2">
                    <img :src="cart.imgUrl">
                    <div class="item-msg">{{cart.skuName}}</div>
                  </li>
                  <!-- 商品介绍 -->
                  <li class="cart-list-con3">
                    <div class="item-txt">{{cart.sourceType}}</div>
                  </li>
                  <!-- 商品价格 -->
                  <li class="cart-list-con4">
                    <span class="price">{{cart.cartPrice.toFixed(2)}}</span>
                  </li>
                  <!-- 商品数量操作 -->
                  <li class="cart-list-con5">
                    <a href="javascript:void(0)" class="mins">-</a>
                    <input autocomplete="off" type="text" :value="cart.skuNum" class="itxt">
                    <a href="javascript:void(0)" class="plus">+</a>
                  </li>
                  <!-- 商品小记 -->
                  <li class="cart-list-con6">
                    <span class="sum">{{ cart.cartPrice * cart.skuNum }}</span>
                  </li>
                  <!-- 操作商品 -->
                  <li class="cart-list-con7">
                    <a href="#none" class="sindelet">删除</a>
                    <br>
                    <a href="#none">移到收藏</a>
                  </li>
              </ul>
            </div>
        </div>
        <!-- 购物车底部 -->
        <div class="cart-tool">
            <!-- 全选 -->
            <div class="select-all">
              <input class="chooseAll" type="checkbox">
              <span>全选</span>
            </div>
            <!-- 操作 -->
            <div class="option">
              <a href="#none">删除选中的商品</a>
              <a href="#none">移到我的关注</a>
              <a href="#none">清除下柜商品</a>
            </div>
            <!-- 信息 -->
            <div class="money-box">
              <div class="chosed">已选择
                  <span>{{checkTotal}}</span>件商品</div>
              <div class="sumprice">
                  <em>总价（不含运费） ：</em>
                  <i class="summoney">{{priceTotal}}</i>
              </div>
              <div class="sumbtn">
                  <a class="sum-btn" href="###" target="_blank">结算</a>
              </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Cart',
  computed: {
    ...mapState('cart', ['cartList']),
    // 计算选中商品数量
    checkTotal () {
      return this.cartList.reduce((sum, item) => item.isChecked === 1 ? sum + 1 : sum + 0, 0)
    },
    // 计算选中商品总价
    priceTotal () {
      let sum = 0
      this.cartList.forEach(item => {
        if (item.isChecked === 1) {
          sum += item.skuNum * item.cartPrice
        }
      })
      return sum
    }
  },
  mounted () {
    this.$store.dispatch('cart/getCartList')
  }
}
</script>

<style lang="scss" scoped>
.cart{
    width: 1200px;
    margin: 0 auto;
    h4{
        margin: 9px 0;
        font-size: 14px;
        line-height: 21px;
    }
    .cart-main{
        .cart-th{
            background: #f5f5f5;
            border: 1px solid #ddd;
            padding: 10px;
            overflow: hidden;
            &>div{
                float: left;
            }
            .cart-th1{
                width: 25%;
                input{
                    vertical-align: middle;
                }
                span{
                    vertical-align: middle;
                }
            }
            .cart-th2{
                width: 25%;
            }
            .cart-th3,.cart-th4,.cart-th5,.cart-th6{
                width: 12.5%;

            }
        }
        .cart-body{
            margin: 15px 0;
            border: 1px solid #ddd;
            .cart-list{
                padding: 10px;
                border-bottom: 1px solid #ddd;
                overflow: hidden;
                &>li{
                    float: left;
                }
                .cart-list-con1{
                    width: 4.1667%;
                }
                .cart-list-con2{
                    width: 25%;
                    img{
                        width: 82px;
                        height: 82px;
                        float: left;
                    }
                    .item-msg{
                        float: left;
                        width: 150px;
                        margin: 0 10px;
                        line-height: 18px;
                    }
                }
                .cart-list-con3{
                    width: 20.8333%;
                    .item-txt{
                        text-align: center;
                    }
                }
                .cart-list-con4{
                    width: 12.5%;

                }
                .cart-list-con5{
                    width: 12.5%;
                    .mins{
                        border: 1px solid #ddd;
                        border-right: 0;
                        float: left;
                        color: #666;
                        width: 6px;
                        text-align: center;
                        padding: 8px;
                    }
                    input{
                        border: 1px solid #ddd;
                        width: 40px;
                        height: 33px;
                        float: left;
                        text-align: center;
                        font-size: 14px;
                    }
                    .plus{
                        border: 1px solid #ddd;
                        border-left: 0;
                        float: left;
                        color: #666;
                        width: 6px;
                        text-align: center;
                        padding: 8px;
                    }
                }
                .cart-list-con6{
                    width: 12.5%;
                    .sum{
                        font-size: 16px;
                    }
                }
                .cart-list-con7{
                    width: 12.5%;
                    a{
                        color: #666;
                    }
                }
            }
        }
    }
    .cart-tool{
        overflow: hidden;
        border: 1px solid #ddd;
        .select-all{
            padding: 10px;
            overflow: hidden;
            float: left;
            span{
                vertical-align: middle;
            }
            input{
                vertical-align: middle;
            }
        }
        .option{
            padding: 10px;
            overflow: hidden;
            float: left;
            a{
                float: left;
                padding: 0 10px;
                color: #666;
            }
        }
        .money-box{
            float: right;
            .chosed{
                line-height: 26px;
                float: left;
                padding: 0 10px;
            }
            .sumprice{
                width: 200px;
                line-height: 22px;
                float: left;
                padding: 0 10px;
                .summoney{
                    color: #c81623;
                    font-size: 16px;
                }
            }
            .sumbtn{
                float: right;
                a{
                    display: block;
                    position: relative;
                    width: 96px;
                    height: 52px;
                    line-height: 52px;
                    color: #fff;
                    text-align: center;
                    font-size: 18px;
                    font-family: "Microsoft YaHei";
                    background: #e1251b;
                    overflow: hidden;
                }
            }
        }
    }
}
</style>
