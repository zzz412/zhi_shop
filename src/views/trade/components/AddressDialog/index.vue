<template>
  <!-- 地址对话框 -->
  <Dialog title="收货地址" :isShow="showDialog" @hidden="showDialog = false">
    <form class="sui-form">
      <!-- 收货人 -->
      <div class="control-group">
        <label class="control-label">收货人：</label>
        <div class="controls">
          <input type="text" class="input-medium">
        </div>
      </div>
      <!-- 联系电话 -->
      <div class="control-group">
        <label class="control-label">联系电话：</label>
        <div class="controls">
          <input type="text" class="input-medium">
        </div>
      </div>
      <!-- 所在地区 -->
      <div class="control-group">
        <label class="control-label">所在地区：</label>
        <div class="controls">
          <select style="width: 100px;">
            <option value="">1</option>
            <option value="">2</option>
            <option value="">3</option>
            <option value="">4</option>
          </select>
          <select style="width: 100px;margin-left: 10px;">
            <option value="">1</option>
            <option value="">2</option>
            <option value="">3</option>
            <option value="">4</option>
          </select>
        </div>
      </div>
      <!-- 详细地址 -->
      <div class="control-group">
        <label class="control-label">详细地址：</label>
        <div class="controls">
          <input type="text" class="input-medium" style="width: 300px;">
        </div>
      </div>
      <!-- 是否默认地址 -->
      <div class="control-group">
        <label class="control-label">是否默认地址：</label>
        <div class="controls">
          <input type="checkbox">
        </div>
      </div>
    </form>
  </Dialog>
</template>

<script>
export default {
  name: 'AddressDialog',
  data () {
    return {
      // 显示dialog
      showDialog: true
    }
  }
}
</script>

<style lang="scss" scoped>
.sui-form {
    margin: 0 0 18px;
    font-size: 12px;
    line-height: 18px;
    .control-group {
        margin-bottom: 18px;
        display: table;
    }
    .control-label{
        width: 96px;
        text-align: right;
        display: table-cell;
        vertical-align: middle;
        line-height: 24px;
    }
    .controls {
        display: table-cell;
        padding-left: 3px;
        .input-medium {
            width: 200px;
            padding-left: 4px;
            padding-right: 4px;
            display: inline-block;
            margin-bottom: 0;
            vertical-align: middle;
            height: 18px;
            padding: 2px 4px;
            font-size: 12px;
            line-height: 18px;
            color: #555;
            border-radius: 2px;
            background-color: #fff;
            border: 1px solid #ccc;
            padding-top: 2px;
            padding-bottom: 2px;
            margin-left: 0;
            outline: none;
        }
        select {
          border: 1px solid #ccc;
          background-color: #fff;
          height: 24px;
          line-height: 24px;
          display: inline-block;
          margin-bottom: 0;
          vertical-align: middle;
          margin-right: 4px;
        }
        input[type="checkbox"] {
          width: 13px;
          height: 13px;
          margin-bottom: 0;
          vertical-align: middle;
        }
    }
}
</style>
