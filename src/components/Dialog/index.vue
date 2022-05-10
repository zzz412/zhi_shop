<template>
  <div class="dialog" v-if="isShow">
    <!-- 对话框 -->
    <div class="dialog-view">
      <!-- 头部 -->
      <div class="header">
        <h3 class="title">{{title}}</h3>
        <span class="close" @click="$emit('hidden')">x</span>
      </div>
      <!-- 内容 -->
      <div class="content">
        <slot></slot>
      </div>
      <!-- 底部 -->
      <div class="footer">
        <!-- 插槽默认值 -->
        <slot name="footer">
          <button class="cancel" @click="$emit('cancel')">{{cancelText}}</button>
          <button class="ok" @click="$emit('ok')">{{okText}}</button>
        </slot>
      </div>
    </div>
    <!-- 对话框遮罩 -->
    <div class="dialog-mask"></div>
  </div>
</template>

<script>
export default {
  name: 'Dialog',
  props: {
    // 是否显示
    isShow: {
      type: Boolean,
      default: false
    },
    // 标题
    title: String,
    // 取消按钮文字内容
    cancelText: {
      type: String,
      default: '取消'
    },
    // 确定按钮文字内容
    okText: {
      type: String,
      default: '确定'
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog-view {
  position: fixed;
  background: #FFF;
  width: 500px;
  padding: 20px 30px;
  left: 50%;
  top: 50%;
  z-index: 9999;
  transform: translate(-50%, -50%);
  border-radius: 4px;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title {
      font-size: 20px;
      font-weight: 400;
    }
    .close {
      font-size: 18px;
      color: #ccc;
      cursor: pointer;
    }
  }
  .content {
    margin-top: 20px;
  }
  .footer {
    margin-top: 20px;
    text-align: right;
    button {
      padding: 9px 15px;
      display: inline-block;
      line-height: 1;
      white-space: nowrap;
      cursor: pointer;
      background: #fff;
      border: 1px solid #dcdfe6;
      color: #606266;
      text-align: center;
      box-sizing: border-box;
      margin: 0;
      transition: .1s;
      font-weight: 500;
      font-size: 12px;
      border-radius: 3px;
      &.ok {
        color: #fff;
        margin-left: 10px;
        background: #409eff;
        border-color: #409eff;
      }
    }
  }
}

.dialog-mask {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 9998;
}
</style>
