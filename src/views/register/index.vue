<template>
  <!-- 注册内容 -->
  <div class="register">
    <!-- 头部标题 -->
    <h3>
      注册新用户
      <span class="go">
        我有账号，去 <a href="login.html" target="_blank">登陆</a>
      </span>
    </h3>
    <!-- 3. 使用验证组件包裹需要验证的模块 -->
    <!-- 默认会验证被v-model绑定的值 -->
    <ValidationProvider rules="max:12|min" v-slot="{ errors }">
      <h2>验证输入框长度 最低6 最大12</h2>
      <input type="text" v-model="a">
      <!-- 将errors[0]  填入到报错位置 【报错时自动显示】 -->
      <span>{{errors[0]}}</span>
    </ValidationProvider>

    <form v-if="false">
      <!-- 手机号 -->
      <div class="content">
        <label>手机号:</label>
        <input type="text" placeholder="请输入你的手机号">
        <!-- <span class="error-msg">错误提示信息</span> -->
      </div>
      <!-- 验证码 -->
      <div class="content">
        <label>验证码:</label>
        <input type="text" placeholder="请输入验证码">
        <button class="code-btn">获取验证码</button>
        <!-- <span class="error-msg">错误提示信息</span> -->
      </div>
      <!-- 登录密码 -->
      <div class="content">
        <label>登录密码:</label>
        <input type="text" placeholder="请输入你的登录密码">
        <!-- <span class="error-msg">错误提示信息</span> -->
      </div>
      <!-- 确认密码 -->
      <div class="content">
        <label>确认密码:</label>
        <input type="text" placeholder="请输入确认密码">
        <!-- <span class="error-msg">错误提示信息</span> -->
      </div>
      <!-- 确认协议 -->
      <div class="controls">
        <input name="m1" type="checkbox">
        <span>同意协议并注册《智品汇用户协议》</span>
        <!-- <span class="error-msg">错误提示信息</span> -->
      </div>
      <!-- 注册按钮 -->
      <div class="btn">
        <button>完成注册</button>
      </div>
    </form>
  </div>
</template>

<script>
// 1. 导入验证组件
import { ValidationProvider, extend } from 'vee-validate'

// 4. 自定义验证规则
// 验证最大长度不能超过12
extend('max', {
  // 验证规则
  validate: (value, { length }) => value.length < length,
  // 定义参数
  params: ['length'],
  // 提示信息
  message: '长度不能大于{length}'
})

// 验证最小长度不能低于6
extend('min', {
  // 验证规则
  validate: value => value.length > 6,
  // 提示信息
  message: '长度不能小于6'
})

export default {
  name: 'Register',
  // 2. 注册验证组件
  components: { ValidationProvider },
  data () {
    return {
      a: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.register {
  width: 1200px;
  height: 445px;
  border: 1px solid rgb(223, 223, 223);
  margin: 0 auto;

  h3 {
    background: #ececec;
    margin: 0;
    padding: 6px 15px;
    color: #333;
    border-bottom: 1px solid #dfdfdf;
    font-size: 20.04px;
    line-height: 30.06px;

    span {
      font-size: 14px;
      float: right;

      a {
        color: #e1251b;
      }
    }
  }

  div:nth-of-type(1) {
    margin-top: 40px;
  }

  .content {
    padding-left: 390px;
    margin-bottom: 18px;
    position: relative;

    label {
      font-size: 14px;
      width: 96px;
      text-align: right;
      display: inline-block;
    }

    input {
      width: 270px;
      height: 38px;
      padding-left: 8px;
      box-sizing: border-box;
      margin-left: 5px;
      outline: none;
      border: 1px solid #999;
    }

    img {
      vertical-align: sub;
    }

    .error-msg {
      position: absolute;
      top: 100%;
      left: 495px;
      color: red;
    }

    .code-btn {
      width: 100px;
      height: 38px;
    }
  }

  .controls {
    text-align: center;
    position: relative;

    input {
      vertical-align: middle;
    }

    .error-msg {
      position: absolute;
      top: 100%;
      left: 495px;
      color: red;
    }
  }

  .btn {
    text-align: center;
    line-height: 36px;
    margin: 17px 0 0 55px;

    button {
      outline: none;
      width: 270px;
      height: 36px;
      background: #e1251b;
      color: #fff !important;
      display: inline-block;
      font-size: 16px;
    }
  }
}
</style>
