<template>
  <div class="trade-view">
    <!-- 标题 -->
    <h3 class="title">填写并核对订单信息</h3>
    <!-- 主体内容 -->
    <div class="content">
      <!-- 收货地址 -->
      <h5 class="receive">
        收件人信息
        <a class="add_btn" href="javascript:" @click="$refs.dialog.showDialog = true">新增收货地址</a>
      </h5>
      <div class="address clearFix" v-for="address, i in addressList" :key="address.id">
        <span class="username" :class="{ selected: selectedIndex === i }">{{address.consignee}}</span>
        <p @click="selectedIndex = i">
          <span class="s1">{{address.fullAddress}}</span>
          <span class="s2">{{address.phoneNum}}</span>
          <span class="s3" v-if="address.isDefault === '1'">默认地址</span>
        </p>
        <div class="right">
          <span @click="updateAddress(address)">修改</span>
          <span @click="removeAddress(address.id)">删除</span>
        </div>
      </div>
      <div class="line"></div>

      <!-- 支付方式 -->
      <h5 class="pay">支付方式</h5>
      <div class="address clearFix">
        <span class="username selected">在线支付</span>
        <span class="username" style="margin-left: 5px">货到付款</span>
      </div>
      <div class="line"></div>

      <!-- 送货清单 -->
      <h5 class="pay">送货清单</h5>
      <div class="way">
        <h5>配送方式</h5>
        <div class="info clearFix">
          <span class="s1">天天快递</span>
          <p>配送时间：预计8月10日（周三）09:00-15:00送达</p>
        </div>
      </div>
      <div class="detail">
        <h5>商品清单</h5>
        <ul class="list clearFix" v-for="item in orderInfo.detailArrayList" :key="item.skuId">
          <li>
            <img style="width:64px;height:64px;" :src="item.imgUrl" alt="" />
          </li>
          <li>
            <p style="width:300px;line-height:1.5;">
              {{item.skuName}}
            </p>
            <h4>7天无理由退货</h4>
          </li>
          <li>
            <h3>￥{{item.orderPrice}}.00</h3>
          </li>
          <li>X{{item.skuNum}}</li>
          <li>有货</li>
        </ul>
      </div>

      <!-- 买家留言 -->
      <div class="bbs">
        <h5>买家留言：</h5>
        <textarea
          placeholder="建议留言前先与商家沟通确认"
          class="remarks-cont"
          v-model="orderComment"
        ></textarea>
      </div>
      <div class="line"></div>

      <!-- 发票信息 -->
      <div class="bill">
        <h5>发票信息：</h5>
        <div>普通发票（电子） 个人 明细</div>
        <h5>使用优惠/抵用</h5>
      </div>
    </div>
    <!-- 价格清单 -->
    <div class="money clearFix">
      <ul>
        <li>
          <b><i>{{orderInfo.totalNum}}</i>件商品，总商品金额</b>
          <span>¥{{orderInfo.originalTotalAmount}}.00</span>
        </li>
        <li>
          <b>返现：</b>
          <span>0.00</span>
        </li>
        <li>
          <b>运费：</b>
          <span>0.00</span>
        </li>
      </ul>
    </div>
    <!-- 订单配送信息 -->
    <div class="trade">
      <div class="price">应付金额: <span>¥{{orderInfo.totalAmount}}.00</span></div>
      <div class="receiveInfo">
        寄送至:
        <span>{{selectedAddress.fullAddress}}</span>
        收货人：<span>{{selectedAddress.consignee}} </span>
        <span>{{selectedAddress.phoneNum}}</span>
      </div>
    </div>
    <!-- 提交按钮 -->
    <div class="sub clearFix">
      <a href="javascript:" class="subBtn" @click="submitOrder">提交订单</a>
    </div>
    <!-- 地址对话框 -->
    <AddressDialog ref="dialog"/>
  </div>
</template>

<script>
import { reqAddressList, reqOrder, removeAddress, reqSubmitOrder } from '@/api/order'
import AddressDialog from './components/AddressDialog'

export default {
  name: 'Trade',
  components: { AddressDialog },
  data () {
    return {
      // 地址列表
      addressList: [],
      // 当前选中地址索引
      selectedIndex: 0,
      orderInfo: {},
      // 订单备注
      orderComment: ''
    }
  },
  computed: {
    selectedAddress () {
      return this.addressList[this.selectedIndex] || {}
    }
  },
  methods: {
    // 获取收货地址
    async getAddressList () {
      const res = await reqAddressList()
      this.addressList = res
      // 设置当前选中地址索引
      this.selectedIndex = res.findIndex(item => item.isDefault === '1')
    },
    // 获取订单信息
    async getOrderInfo () {
      const res = await reqOrder()
      this.orderInfo = res
    },
    // 删除收货地址
    async removeAddress (id) {
      await removeAddress(id)
      // 重新渲染地址列表
      this.getAddressList()
    },
    // 修改收货地址
    updateAddress (address) {
      // 1. 显示对话框  refs
      this.$refs.dialog.showDialog = true
      // 2. 设置formInput的值 [拷贝一份再设置]
      this.$refs.dialog.formInput = { ...address, isCheckDefault: address.isDefault === '1' }
    },
    // 提交订单
    async submitOrder () {
      // 1. 准备数据结构
      const { orderInfo: { tradeNo, detailArrayList }, selectedAddress, orderComment } = this
      const data = {
        consignee: selectedAddress.consignee, // 收件人姓名
        consigneeTel: selectedAddress.phoneNum, // 收件人电话
        deliveryAddress: selectedAddress.fullAddress, // 收件人地址
        paymentWay: 'ONLINE', // 支付方式
        orderComment, // 订单备注
        orderDetailList: detailArrayList // 订单商品
      }
      // console.log(tradeNo, data)
      // 2. 发起请求提交订单
      try {
        const res = await reqSubmitOrder(tradeNo, data)
        console.log(res)
        // 3. 跳转到支付页面
        this.$router.push('/pay?orderId=' + res)
      } catch (error) {
        console.log('提交失败')
      }
    }
  },
  mounted () {
    this.getAddressList()
    this.getOrderInfo()
  },
  // 路由进入前
  beforeRouteEnter (to, from, next) {
    // 只能从购物车页进入 其他页面禁止跳转
    if (from.path === '/cart') {
      next()
    } else {
      next(false)
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  width: 1200px;
  margin: 0 auto;
  font-size: 14px;
  line-height: 21px;
}
.content {
  width: 1200px;
  margin: 10px auto 0;
  border: 1px solid rgb(221, 221, 221);
  padding: 25px;
  box-sizing: border-box;
  .receive,
  .pay {
    line-height: 36px;
    margin: 18px 0;
  }
  .add_btn {
    float: right;
  }
  .address {
    padding-left: 20px;
    margin-bottom: 15px;
    .right {
        float: right;
        line-height: 22px;
        span {
          margin-left: 20px;
          cursor: pointer;
        }
    }
    .username {
      float: left;
      width: 100px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      border: 1px solid #ddd;
      position: relative;
    }
    .username::after {
      content: "";
      display: none;
      width: 13px;
      height: 13px;
      position: absolute;
      right: 0;
      bottom: 0;
      background: url(@/assets/images/choosed.png) no-repeat;
    }
    .username.selected {
      border-color: #e1251b;
    }
    .username.selected::after {
      display: block;
    }
    p {
      width: 610px;
      float: left;
      line-height: 30px;
      margin-left: 10px;
      padding-left: 5px;
      cursor: pointer;
      .s1 {
        float: left;
      }
      .s2 {
        float: left;
        margin: 0 5px;
      }
      .s3 {
        float: left;
        width: 56px;
        height: 24px;
        line-height: 24px;
        margin-left: 10px;
        background-color: #878787;
        color: #fff;
        margin-top: 3px;
        text-align: center;
      }
    }
    p:hover {
      background-color: #ddd;
    }
  }
  .line {
    height: 1px;
    background-color: #ddd;
  }
  .way {
    width: 1080px;
    height: 110px;
    background: #f4f4f4;
    padding: 15px;
    margin: 0 auto;
    h5 {
      line-height: 50px;
    }
    .info {
      margin-top: 20px;
      .s1 {
        float: left;
        border: 1px solid #ddd;
        width: 120px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        margin-right: 10px;
      }
      p {
        line-height: 30px;
      }
    }
  }
  .detail {
    width: 1080px;

    background: #feedef;
    padding: 15px;
    margin: 2px auto 0;
    h5 {
      line-height: 50px;
    }
    .list {
      display: flex;
      justify-content: space-between;
      li {
        line-height: 30px;
        p {
          margin-bottom: 20px;
        }
        h4 {
          color: #c81623;
          font-weight: 400;
        }
        h3 {
          color: #e12228;
        }
      }
    }
  }
  .bbs {
    margin-bottom: 15px;
    h5 {
      line-height: 50px;
    }
    textarea {
      width: 100%;
      border-color: #e4e2e2;
      line-height: 1.8;
      outline: none;
      resize: none;
    }
  }
  .bill {
    h5 {
      line-height: 50px;
    }
    div {
      padding-left: 15px;
    }
  }
}
.money {
  width: 1200px;
  margin: 20px auto;
  ul {
    width: 220px;
    float: right;
    li {
      line-height: 30px;
      display: flex;
      justify-content: space-between;
      i {
        color: red;
      }
    }
  }
}
.trade {
  box-sizing: border-box;
  width: 1200px;
  padding: 10px;
  margin: 10px auto;
  text-align: right;
  background-color: #f4f4f4;
  border: 1px solid #ddd;
  div {
    line-height: 30px;
  }
  .price span {
    color: #e12228;
    font-weight: 700;
    font-size: 14px;
  }
  .receiveInfo {
    color: #999;
  }
}
.sub {
  width: 1200px;
  margin: 0 auto 10px;
  .subBtn {
    float: right;
    width: 164px;
    height: 56px;
    font: 700 18px "微软雅黑";
    line-height: 56px;
    text-align: center;
    color: #fff;
    background-color: #e1251b;
  }
}
</style>
