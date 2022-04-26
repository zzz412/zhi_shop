<template>
  <div class="detail-view">
    <!-- 分类导航 -->
    <TypeNav></TypeNav>
    <!-- 主要内容区域 -->
    <section class="con">
      <!-- 导航路径区域 -->
      <div class="conPoin">
        <div class="conPoin">
          <a v-for="item, i  in cateNav" :key="i">{{item}}</a>
        </div>
      </div>
      <!-- 主要内容区域 -->
      <div class="mainCon">
        <!-- 左侧放大镜区域 -->
        <div class="previewWrap">
          <Zoom />
          <ImageList />
        </div>
        <!-- 右侧选择区域布局 -->
        <div class="InfoWrap">
          <div class="goodsDetail">
            <h3 class="InfoName">
              {{skuInfo.skuName}}
            </h3>
            <p class="news">
              {{skuInfo.skuDesc}}
            </p>
            <div class="priceArea">
              <div class="priceArea1">
                <div class="title">
                  价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格
                </div>
                <div class="price">
                  <i>¥</i>
                  <em>{{skuInfo.price}}</em>
                  <span>降价通知</span>
                </div>
                <div class="remark">
                  <i>累计评价</i>
                  <em>{{skuInfo.tmId}}</em>
                </div>
              </div>
              <div class="priceArea2">
                <div class="title">
                  <i>促&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;销</i>
                </div>
                <div class="fixWidth">
                  <i class="red-bg">加价购</i>
                  <em class="t-gray"
                    >满999.00另加20.00元，或满1999.00另加30.00元，或满2999.00另加40.00元，即可在购物车换购热销商品</em
                  >
                </div>
              </div>
            </div>
            <div class="support">
              <div class="supportArea">
                <div class="title">
                  支&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;持
                </div>
                <div class="fixWidth">
                  以旧换新，闲置手机回收 4G套餐超值抢 礼品购
                </div>
              </div>
              <div class="supportArea">
                <div class="title">配 送 至</div>
                <div class="fixWidth">广东省 深圳市 宝安区</div>
              </div>
            </div>
          </div>

          <div class="choose">
            <div class="chooseArea">
              <div class="choosed"></div>
              <dl v-for="spu in spuList" :key="spu.id">
                <dt class="title">{{spu.saleAttrName}}</dt>
                <dd
                  v-for="value in spu.spuSaleAttrValueList"
                  :class="{ active: value.isChecked === '1' }"
                  :key="value.id"
                  @click="changeSpuValue(value, spu)"
                >
                  {{value.saleAttrValueName}}
                </dd>
              </dl>
            </div>

            <div class="cartWrap">
              <div class="controls">
                <input
                  autocomplete="off"
                  class="itxt"
                  :value="skuNum"
                  @change="changeSkuNum"
                />
                <a href="javascript:" class="plus" @click="skuNum ++">+</a>
                <a href="javascript:" class="mins" @click="skuNum = skuNum > 1 ? skuNum - 1 : 1">-</a>
              </div>
              <div class="add">
                <a href="javascript:" @click="addCart">加入购物车</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- 内容详情 -->
    <ProductDetail />
  </div>
</template>

<script>
import ProductDetail from './components/ProductDetail'
import Zoom from './components/Zoom'
import ImageList from './components/ImageList'
import { mapGetters } from 'vuex'

export default {
  name: 'Detail',
  components: { ProductDetail, Zoom, ImageList },
  props: ['skuId'],
  data () {
    return {
      skuNum: 1
    }
  },
  computed: {
    ...mapGetters('detail', ['cateNav', 'skuInfo', 'spuList'])
  },
  mounted () {
    // 获取商品详细信息
    this.$store.dispatch('detail/getGoodsInfo', this.skuId).catch(() => {
      // 处理错误信息
      this.$router.back()
    })
  },
  methods: {
    // 更改选中规格
    changeSpuValue (attrValue, spu) {
      // 其他规格值 isChecked 为0
      spu.spuSaleAttrValueList.forEach(value => { value.isChecked = '0' })
      // 设置被点击的规格值 isChecked为1
      attrValue.isChecked = '1'
    },
    // 数量修改
    changeSkuNum (e) {
      const value = e.target.value - 0
      this.skuNum = value
      // 判断值是否有效 (小于1, 非数字)
      if (value < 1 || isNaN(value)) {
        this.skuNum = 1
      } else {
        this.skuNum = parseInt(value)
      }
    },
    // 添加商品至购物车
    async addCart () {
      // 1. 发起请求添加到购物车
      await this.$store.dispatch('cart/addCartList', { skuId: this.skuId, skuNum: this.skuNum })
      // 1.1 将当前商品信息存储到本地中
      sessionStorage.setItem('ZHI_GOODS_INFO', JSON.stringify({ ...this.skuInfo, skuNum: this.skuNum }))
      // 2. 跳转到添加购物车成功页
      this.$router.push('/addCart')
    }
  }
}
</script>

<style lang="scss" scoped>
.con {
  width: 1200px;
  margin: 15px auto 0;
  .conPoin {
    padding: 9px 15px 9px 0;
    & > a + a:before {
      content: "/\00a0";
      padding: 0 5px;
      color: #ccc;
    }
  }
  .mainCon {
    overflow: hidden;
    margin: 5px 0 15px;
    .previewWrap {
      float: left;
      width: 400px;
      position: relative;
    }
    .InfoWrap {
      width: 700px;
      float: right;
      .InfoName {
        font-size: 14px;
        line-height: 21px;
        margin-top: 15px;
      }
      .news {
        color: #e12228;
        margin-top: 15px;
      }
      .priceArea {
        background: #fee9eb;
        padding: 7px;
        margin: 13px 0;
        .priceArea1 {
          overflow: hidden;
          line-height: 28px;
          margin-top: 10px;
          .title {
            float: left;
            margin-right: 15px;
          }
          .price {
            float: left;
            color: #c81623;
            i {
              font-size: 16px;
            }
            em {
              font-size: 24px;
              font-weight: 700;
            }
            span {
              font-size: 12px;
            }
          }
          .remark {
            float: right;
          }
        }
        .priceArea2 {
          overflow: hidden;
          line-height: 28px;
          margin-top: 10px;
          .title {
            margin-right: 15px;
            float: left;
          }
          .fixWidth {
            width: 520px;
            float: left;
            .red-bg {
              background: #c81623;
              color: #fff;
              padding: 3px;
            }
            .t-gray {
              color: #999;
            }
          }
        }
      }
      .support {
        border-bottom: 1px solid #ededed;
        padding-bottom: 5px;
        .supportArea {
          overflow: hidden;
          line-height: 28px;
          margin-top: 10px;
          .title {
            margin-right: 15px;
            float: left;
          }
          .fixWidth {
            width: 520px;
            float: left;
            color: #999;
          }
        }
      }
      .choose {
        .chooseArea {
          overflow: hidden;
          line-height: 28px;
          margin-top: 10px;
          .choosed {
            mark {
              height: 30px;
              display: inline-block;
              line-height: 30px;
              background-color: snow;
              border: 1px solid #ddd;
              padding: 0 20px;
              margin-right: 20px;
              a {
                font-size: 12px;
                color: red;
                margin-left: 20px;
                cursor: pointer;
              }
            }
          }
          dl {
            overflow: hidden;
            margin: 13px 0;
            dt {
              margin-right: 15px;
              float: left;
            }
            dd {
              float: left;
              margin-right: 5px;
              color: #666;
              line-height: 24px;
              padding: 2px 14px;
              border-top: 1px solid #eee;
              border-right: 1px solid #bbb;
              border-bottom: 1px solid #bbb;
              border-left: 1px solid #eee;
              &.active {
                border: 1px solid red;
                color: red;
              }
            }
          }
        }
        .cartWrap {
          .controls {
            width: 48px;
            position: relative;
            float: left;
            margin-right: 15px;
            .itxt {
              width: 38px;
              height: 37px;
              border: 1px solid #ddd;
              color: #555;
              float: left;
              border-right: 0;
              text-align: center;
            }
            .plus,
            .mins {
              width: 15px;
              text-align: center;
              height: 17px;
              line-height: 17px;
              background: #f1f1f1;
              color: #666;
              position: absolute;
              right: -8px;
              border: 1px solid #ccc;
            }
            .mins {
              right: -8px;
              top: 19px;
              border-top: 0;
            }
            .plus {
              right: -8px;
            }
          }
          .add {
            float: left;
            a {
              background-color: #e1251b;
              padding: 0 25px;
              font-size: 16px;
              color: #fff;
              height: 36px;
              line-height: 36px;
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>
