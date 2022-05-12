<template>
  <!--中间内容-->
  <div class="pay-main">
      <div class="pay-container">
          <div class="checkout-tit">
              <h4 class="tit-txt">
                  <span class="success-icon"></span>
                  <span class="success-info">订单提交成功，请您及时付款，以便尽快为您发货~~</span>
              </h4>
              <div class="paymark">
                  <span class="fl">请您在提交订单<em class="orange time">4小时</em>之内完成支付，超时订单会自动取消。订单号：<em>{{$route.query.orderId}}</em></span>
                  <span class="fr"><em class="lead">应付金额：</em><em class="orange money">￥{{payInfo.totalFee}}</em></span>
              </div>
          </div>
          <div class="checkout-info">
              <h4>重要说明：</h4>
              <ol>
                  <li>智品汇商城支付平台目前支持<span class="zfb">支付宝</span>支付方式。</li>
                  <li>其它支付渠道正在调试中，敬请期待。</li>
                  <li>为了保证您的购物支付流程顺利完成，请保存以下支付宝信息。</li>
              </ol>
              <h4>支付宝账户信息：（很重要，<span class="save">请保存！！！</span>）</h4>
              <ul>
                  <li>支付帐号：11111111</li>
                  <li>密码：111111</li>
                  <li>支付密码：111111</li>
              </ul>
          </div>
          <div class="checkout-steps">
              <div class="step-tit">
                  <h5>支付平台</h5>
              </div>
              <div class="step-cont">
                  <ul class="payType">
                      <li><img src="@/assets/images/pay2.jpg"></li>
                      <li><img src="@/assets/images/pay3.jpg"></li>
                  </ul>

              </div>
              <div class="hr"></div>

              <div class="payshipInfo">
                  <div class="step-tit">
                      <h5>支付网银</h5>
                  </div>
                  <div class="step-cont">
                      <ul class="payType">
                          <li><img src="@/assets/images/pay10.jpg"></li>
                          <li><img src="@/assets/images/pay11.jpg"></li>
                          <li><img src="@/assets/images/pay12.jpg"></li>
                          <li><img src="@/assets/images/pay13.jpg"></li>
                          <li><img src="@/assets/images/pay14.jpg"></li>
                          <li><img src="@/assets/images/pay15.jpg"></li>
                          <li><img src="@/assets/images/pay16.jpg"></li>
                          <li><img src="@/assets/images/pay17.jpg"></li>
                          <li><img src="@/assets/images/pay18.jpg"></li>
                          <li><img src="@/assets/images/pay19.jpg"></li>
                          <li><img src="@/assets/images/pay20.jpg"></li>
                          <li><img src="@/assets/images/pay21.jpg"></li>
                          <li><img src="@/assets/images/pay22.jpg"></li>

                      </ul>
                  </div>

              </div>
              <div class="hr"></div>

              <div class="submit">
                  <a class="btn" href="javascript:" @click="showPay">立即支付</a>
              </div>
              <div class="otherpay">
                  <div class="step-tit">
                      <h5>其他支付方式</h5>
                  </div>
                  <div class="step-cont">
                      <span><a href="weixinpay.html" target="_blank">微信支付</a></span>
                      <span>中国银联</span>
                  </div>
              </div>
          </div>
      </div>
      <Dialog
        :isShow="isShow"
        title="扫码支付"
        cancelText="取消支付"
        okText="支付成功"
        @hidden="cancelPay"
        @ok="payOk"
        @cancel="cancelPay"
      >
        <div class="main">
          <img :src="qrCodeUrl"/>
        </div>
      </Dialog>
  </div>
</template>

<script>
import { reqPayInfo, reqPayState } from '@/api/order'
import QrCode from 'qrcode'

export default {
  name: 'Pay',
  data () {
    return {
      isShow: false,
      payInfo: {},
      // 二维码地址
      qrCodeUrl: ''
    }
  },
  methods: {
    // 获取支付信息
    async getPayInfo () {
      const res = await reqPayInfo(this.$route.query.orderId)
      this.payInfo = res
    },
    // 展示支付二维码
    async showPay () {
      // 1. 显示弹窗
      this.isShow = true
      // 2. 使用JS 将【支付地址】字符串转为二维码  (qrcode)
      const url = await QrCode.toDataURL(this.payInfo.codeUrl)
      this.qrCodeUrl = url
      // 3. 每隔1s请求一次 支付状态
      this.timer = setInterval(async () => {
        const { code } = await reqPayState(this.$route.query.orderId)
        // 保存支付状态
        this.payCode = code
        // 判断是否支付成功
        if (code === 200) {
          // 跳转支付成功页
          this.$router.push('/payok')
        }
      }, 2000)
    },
    // 支付成功
    payOk () {
      // code为200则支付成功  为205则未支付
      if (this.payCode === 200) {
        // 跳转支付成功页
        this.$router.push('/payok')
      } else {
        // 提示未支付
        alert('未支付')
      }
    },
    // 取消支付
    cancelPay () {
      // 1. 关闭定时器
      this.timer && clearInterval(this.timer)
      // 2. 关闭支付框
      this.isShow = false
    }
  },
  mounted () {
    this.getPayInfo()
  },
  beforeDestroy () {
    // 1. 关闭定时器
    this.timer && clearInterval(this.timer)
  },
  // 路由进入前
  beforeRouteEnter (to, from, next) {
    // 只能从订单页进入 其他页面禁止跳转
    if (from.path === '/trade') {
      next()
    } else {
      next(false)
    }
  }
}
</script>

<style lang="scss" scoped>
//中间内容
.pay-main {
  margin-bottom: 20px;
  .pay-container {
      margin: 0 auto;
      width: 1200px;
      a:hover {
          color:#4cb9fc;
      }
      .orange {
          color: #e1251b;
      }
      .money {
          font-size: 18px;
      }
      .zfb {
          color: #e1251b;
          font-weight: 700;
      }
      .checkout-tit {
          padding: 10px;
          .tit-txt {
              font-size: 14px;
              line-height: 21px;
              .success-icon {
                  width: 30px;
                  height: 30px;
                  display: inline-block;
                  background: url(@/assets/images/icon.png) no-repeat 0 0;
              }
              .success-info {
                  padding: 0 8px;
                  line-height: 30px;
                  vertical-align: top;
              }
          }
          .paymark {
              overflow: hidden;
              line-height: 26px;
              text-indent: 38px;
              .fl {
                  float: left;
              }
              .fr {
                  float: right;
                  .lead {
                      margin-bottom: 18px;
                      font-size: 15px;
                      font-weight: 400;
                      line-height: 22.5px;
                  }
              }
          }
      }
      .checkout-info {
          padding-left: 25px;
          padding-bottom: 15px;
          margin-bottom: 10px;
          border: 2px solid #e1251b;
          h4 {
              margin: 9px 0;
              font-size: 14px;
              line-height: 21px;
              color: #e1251b;
          }
          ol {
                padding-left: 25px;
                list-style-type: decimal;
                line-height: 24px;
                font-size: 14px;
            }
          ul {
              padding-left: 25px;
              list-style-type: disc;
              line-height: 24px;
              font-size: 14px;
          }
      }
      .checkout-steps {
          border: 1px solid #ddd;
          padding: 25px;
          .hr {
              height: 1px;
              background-color: #ddd;
          }
          .step-tit {
              line-height: 36px;
              margin: 15px 0;
          }
          .step-cont {
              margin: 0 10px 12px 20px;
              ul {
                  font-size: 0;
                  li {
                      margin: 2px;
                      display: inline-block;
                      padding: 5px 20px;
                      border: 1px solid #ddd;
                      cursor: pointer;
                      line-height: 18px;
                  }
              }
          }
      }
      .submit {
          text-align: center;
          .btn {
              display: inline-block;
              padding: 15px 45px;
              margin: 15px 0 10px;
              font: 18px "微软雅黑";
              font-weight: 700;
              border-radius: 0;
              background-color: #e1251b;
              border: 1px solid #e1251b;
              color: #fff;
              text-align: center;
              vertical-align: middle;
              cursor: pointer;
              user-select: none;
              text-decoration: none;
          }
      }
  }
}
.main {
  text-align: center;
  img {
    width: 200px;
  }
}
</style>
