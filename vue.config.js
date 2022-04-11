const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 关闭eslint报错
  lintOnSave: false,
  // 自定义开发服务器
  devServer: {
    open: true
  }
})
