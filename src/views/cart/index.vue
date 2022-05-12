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
                    <input type="checkbox" name="chk_list" :checked="cart.isChecked === 1" @change="changeChecked(cart.skuId, $event)">
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
                    <span class="price" v-if="cart.cartPrice">{{cart.cartPrice.toFixed(2)}}</span>
                    <span class="price" v-else>0.00</span>
                  </li>
                  <!-- 商品数量操作 -->
                  <li class="cart-list-con5">
                    <a href="javascript:void(0)" class="mins" @click="changeSkuNum('mins', cart)">-</a>
                    <input
                      autocomplete="off"
                      type="text"
                      class="itxt"
                      :value="cart.skuNum"
                      @change="changeSkuNum('change', cart, $event)"
                    >
                    <a href="javascript:void(0)" class="plus" @click="changeSkuNum('add', cart)">+</a>
                  </li>
                  <!-- 商品小记 -->
                  <li class="cart-list-con6">
                    <span class="sum">{{ cart.cartPrice * cart.skuNum }}</span>
                  </li>
                  <!-- 操作商品 -->
                  <li class="cart-list-con7">
                    <a href="javascript:" class="sindelet" @click="deleteSku(cart.skuId)">删除</a>
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
              <input class="chooseAll" type="checkbox" :checked="isCheckedAll" @change="changeAllChecked">
              <span>全选</span>
            </div>
            <!-- 操作 -->
            <div class="option">
              <a href="javascript:" @click="deleteChecked">删除选中的商品</a>
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
                  <a @click="goTarde" href="javascript:" class="sum-btn" >结算</a>
              </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

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
    },
    // 计算是否全部选中
    isCheckedAll () {
      // 全选 true 否则 false
      // 什么情况下代表全选 =>  cartList中isChecked 没有为 0
      // 什么情况下代表全选 =>  cartList中isChecked 都为1
      // every 循环数组 当前每个值 都满足条件才返回true
      return this.cartList.every(item => item.isChecked === 1) && this.cartList.length !== 0
    }
  },
  mounted () {
    this.getCartList()
  },
  methods: {
    // 解析actions
    ...mapActions('cart', ['getCartList']),
    // 修改购物车数量
    async changeSkuNum (type, cart, e) {
      // 1. 初始化数量
      let skuNum = 0
      const { skuId, skuNum: old_skuNum } = cart
      // 2. 根据操作修改数量
      if (type === 'mins') skuNum = old_skuNum > 1 ? -1 : 0
      if (type === 'add') skuNum = 1
      if (type === 'change') {
        // 获取输入框的值
        const new_skuNum = e.target.value - 0
        // 判断值的有效性
        if (new_skuNum < 0 || isNaN(new_skuNum)) return (e.target.value = old_skuNum)
        // 修改数量 = 当前输入框值 - 之前输入框值
        skuNum = parseInt(new_skuNum) - old_skuNum
      }
      // 3. 派发action 修改购物车数量
      // 3.1 判断数量是否为0
      if (!skuNum) return
      await this.$store.dispatch('cart/addCartList', { skuId, skuNum })
      // 4. 重新获取购物车数据
      this.getCartList()
    },
    // 修改商品状态
    async changeChecked (skuId, e) {
      // console.log(skuId)
      // 1. 获取商品选中状态
      const isChecked = e.target.checked ? 1 : 0
      // 2. 派发action
      await this.$store.dispatch('cart/changeCartChecked', { skuId, checked: isChecked })
      // 3. 重新加载购物车
      this.getCartList()
    },
    // 删除商品
    async deleteSku (skuId) {
      // 1. 派发action删除商品
      await this.$store.dispatch('cart/deleteCart', skuId)
      // 2. 重新获取购物车
      this.getCartList()
    },
    // 修改全部商品状态
    async changeAllChecked (e) {
      // 1. 获取当前选中状态
      const checked = e.target.checked ? 1 : 0
      // 2. 将操作派发到action中
      await this.$store.dispatch('cart/changeAllChecked', checked)
      // 3. 重新加载购物车
      this.getCartList()
    },
    // 删除选中商品
    async deleteChecked () {
      // 0. 判断是否没有选中的商品
      if (this.cartList.filter(item => item.isChecked === 1).length === 0) return
      // 1. 派发action
      await this.$store.dispatch('cart/deleteChecked')
      // 2. 重新获取购物车
      this.getCartList()
    },
    // 进入结算
    goTarde () {
      // 1. 判断是否选中了商品
      if (!this.checkTotal) return
      // 2. 跳转到结算页
      this.$router.push('/trade')
    }
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
