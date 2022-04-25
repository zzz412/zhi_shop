<template>
  <!-- 头部 -->
  <header class="header">
      <!-- 头部的第一行 -->
      <div class="top">
          <div class="container">
              <div class="loginList">
                  <p>智品汇欢迎您！</p>
                  <p>
                      <span>请</span>
                      <a href="###">登录</a>
                      <a href="###" class="register">免费注册</a>
                  </p>
              </div>
              <div class="typeList">
                  <a href="###">我的订单</a>
                  <router-link to="/cart">我的购物车</router-link>
                  <a href="###">我的智品汇</a>
                  <a href="###">智品汇会员</a>
                  <a href="###">企业采购</a>
                  <a href="###">关注智品汇</a>
                  <a href="###">合作招商</a>
                  <a href="###">商家后台</a>
              </div>
          </div>
      </div>
      <!--头部第二行 搜索区域-->
      <div class="bottom">
          <h1 class="logoArea">
              <router-link class="logo" title="智品汇" to="/">
                  <img src="@/assets/images/zz_logo.jpg" alt="">
              </router-link >
          </h1>
          <div class="searchArea">
            <form class="searchForm">
              <input
                type="text"
                id="autocomplete"
                class="input-error input-xxlarge"
                v-model="kw"
                @keyup.enter="goSearch"
              />
              <button
                class="sui-btn btn-xlarge btn-danger"
                type="button"
                @click="goSearch"
              >
                搜索
              </button>
            </form>
          </div>
      </div>
  </header>
</template>

<script>
export default {
  name: 'AppHeader',
  data () {
    return {
      kw: ''
    }
  },
  methods: {
    goSearch () {
      // 使用编程式导航时： 重复跳转同一路由 会产生报错
      // 报错原因： push在跳转后会返回2个回调函数  成功则触发then函数 失败触发catch函数
      //           使用时并没有捕获catch错误 那么就会将错误输出
      // this.$router.push('/search', () => {})
      // this.$router.push('/search')
      // 跳转到搜索页面 并将关键字 通过动态路由传入
      // 匹配结果为空时需要传递 undefined
      this.$router.push({ name: 'search', params: { keyword: this.kw || undefined }, query: this.$route.query })
    }
  },
  mounted () {
    // 订阅 清除关键词事件
    this.$bus.$on('clearKw', () => {
      this.kw = ''
    })
  },
  beforeDestroy () {
    // 取消订阅 清除关键词事件
    this.$bus.$off('clearKw')
  }
}
</script>

<style lang="scss" scoped>
.header {
  &>.top {
      background-color: #eaeaea;
      height: 30px;
      line-height: 30px;

      .container {
          width: 1200px;
          margin: 0 auto;
          overflow: hidden;

          .loginList {
              float: left;

              p {
                  float: left;
                  margin-right: 10px;

                  .register {
                      border-left: 1px solid #b3aeae;
                      padding: 0 5px;
                      margin-left: 5px;
                  }
              }
          }

          .typeList {
              float: right;

              a {
                  padding: 0 10px;

                  &+a {
                      border-left: 1px solid #b3aeae;
                  }
              }

          }

      }
  }

  &>.bottom {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .logoArea {
          float: left;

          .logo {
              img {
                  width: 100px;
                  margin: 0px 45px;
              }
          }
      }

      .searchArea {
          float: right;
          margin-top: 35px;

          .searchForm {
              overflow: hidden;

              input {
                  box-sizing: border-box;
                  width: 490px;
                  height: 32px;
                  padding: 0px 4px;
                  border: 2px solid #ea4a36;
                  float: left;

                  &:focus {
                      outline: none;
                  }
              }

              button {
                  height: 32px;
                  width: 68px;
                  background-color: #ea4a36;
                  border: none;
                  color: #fff;
                  float: left;
                  cursor: pointer;

                  &:focus {
                      outline: none;
                  }
              }
          }
      }
  }
}
</style>
