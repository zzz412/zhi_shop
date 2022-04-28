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
    <!-- <ValidationProvider rules="max:12|min" v-slot="{ errors }"> -->
      <!-- <h2>验证输入框长度 最低6 最大12</h2> -->
      <!-- <input type="text" v-model="a"> -->
      <!-- 将errors[0]  填入到报错位置 【报错时自动显示】 -->
      <!-- <span>{{errors[0]}}</span> -->
    <!-- </ValidationProvider> -->
    <ValidationObserver ref="form">
      <form @submit.prevent="submitForm">
        <!-- 手机号 -->
        <div class="content">
          <ValidationProvider name="phone" rules="required|length:11|phone" v-slot="{ errors }">
              <label>手机号:</label>
              <input type="text" placeholder="请输入你的手机号" v-model="formInput.phone">
              <span class="error-msg">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <!-- 验证码 -->
        <div class="content">
          <ValidationProvider name="code" rules="required|length:6|integer" v-slot="{ errors }">
            <label>验证码:</label>
            <input type="text" placeholder="请输入验证码" v-model="formInput.code">
            <button class="code-btn">获取验证码</button>
            <span class="error-msg">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <!-- 登录密码 -->
        <div class="content">
          <!-- 不能为空 长度大于6  小于12  组成：字母、数字 -->
          <ValidationProvider name="password" rules="required|min:6|max:12|alpha_num"  v-slot="{ errors }">
            <label>登录密码:</label>
            <input type="password" placeholder="请输入你的登录密码" v-model="formInput.password">
            <span class="error-msg">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <!-- 确认密码 -->
        <div class="content">
          <ValidationProvider name="rp_password" :rules="{ required: true, is: formInput.password }"  v-slot="{ errors }">
            <label>确认密码:</label>
            <input type="password" placeholder="请输入确认密码" v-model="formInput.rp_password">
            <span class="error-msg">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <!-- 确认协议 -->
        <div class="controls">
          <ValidationProvider name="agree" rules="required|agree"  v-slot="{ errors }">
            <input name="m1" type="checkbox" v-model="formInput.agree">
            <span>同意协议并注册《智品汇用户协议》</span>
            <span class="error-msg">{{ errors[0] }}</span>
          </ValidationProvider>
        </div>
        <!-- 注册按钮 -->
        <div class="btn">
          <button type="submit">完成注册</button>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
// 1. 导入验证组件
import { ValidationProvider, ValidationObserver } from 'vee-validate'

export default {
  name: 'Register',
  // 2. 注册验证组件
  components: { ValidationProvider, ValidationObserver },
  data () {
    return {
      formInput: {
        phone: '', // 手机号
        agree: true // 协议
      }
    }
  },
  methods: {
    // 提交注册
    async submitForm () {
      // 1. 验证表单是否 通过校验   validate当表单内容全部通过返回true  否则返回false
      const success = await this.$refs.form.validate()
      console.log(success)
      if (!success) return
      // 2. 派发actions 去注册用户
      console.log('注册成功')
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
      margin-left: 10px;
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
