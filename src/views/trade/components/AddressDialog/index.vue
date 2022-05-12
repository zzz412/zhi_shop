<template>
  <!-- 地址对话框 -->
  <Dialog title="收货地址" :isShow="showDialog" @hidden="resetData" @ok="submitForm">
    <form class="sui-form">
      <!-- 收货人 -->
      <div class="control-group">
        <label class="control-label">收货人：</label>
        <div class="controls">
          <input type="text" class="input-medium" v-model="formInput.consignee">
        </div>
      </div>
      <!-- 联系电话 -->
      <div class="control-group">
        <label class="control-label">联系电话：</label>
        <div class="controls">
          <input type="text" class="input-medium" v-model="formInput.phoneNum">
        </div>
      </div>
      <!-- 所在地区 -->
      <div class="control-group">
        <label class="control-label">所在地区：</label>
        <div class="controls">
          <select style="width: 100px;" v-model="formInput.regionId">
            <option value="">请选择地区</option>
            <option :value="region.id" v-for="region in regionList" :key="region.id">{{region.regionName}}</option>
          </select>
          <select style="width: 100px;margin-left: 10px;" v-model="formInput.provinceId">
            <option value="">请选择省份</option>
            <option :value="province.id" v-for="province in provinceList" :key="province.id">{{province.name}}</option>
          </select>
        </div>
      </div>
      <!-- 详细地址 -->
      <div class="control-group">
        <label class="control-label">详细地址：</label>
        <div class="controls">
          <input type="text" class="input-medium" style="width: 300px;" v-model="formInput.userAddress">
        </div>
      </div>
      <!-- 是否默认地址 -->
      <div class="control-group">
        <label class="control-label">是否默认地址：</label>
        <div class="controls">
          <input type="checkbox" v-model="formInput.isCheckDefault">
        </div>
      </div>
    </form>
  </Dialog>
</template>

<script>
import { reqRegion, reqProvince, addAddress, updateAddress } from '@/api/order'

export default {
  name: 'AddressDialog',
  data () {
    return {
      // 显示dialog
      showDialog: false,
      // 表单数据
      formInput: {
        regionId: '',
        provinceId: ''
      },
      // 地区列表
      regionList: [],
      // 省份列表
      provinceList: []
    }
  },
  // 监听器
  watch: {
    // 监听对象中的单个属性
    'formInput.regionId': 'getProvinceList'
  },
  methods: {
    // 获取地区
    async getRegionList () {
      const res = await reqRegion()
      this.regionList = res
    },
    // 获取省份
    async getProvinceList () {
      // 如果没有地区id则不查询
      if (!this.formInput.regionId) return
      // 需求： 修改的第一次不清除  后续需要清除
      // 清除之前选择的省份
      if (this.formInput.id === this.addId) {
        this.formInput.provinceId = ''
      }
      // 保存当前ID
      this.addId = this.formInput.id
      const res = await reqProvince(this.formInput.regionId)
      this.provinceList = res
    },
    // 提交数据
    async submitForm () {
      try {
        // 处理是否为默认地址
        this.formInput.isDefault = this.formInput.isCheckDefault ? '1' : '0'
        // 判断当前操作类型
        if (this.formInput.id) {
          // 修改
          // 发起请求修改地址
          await updateAddress(this.formInput)
        } else {
          // 新增
          // 发起请求新增地址
          await addAddress(this.formInput)
        }
        // 调用父组件方法 重新渲染收货地址
        this.$parent.getAddressList()
        this.resetData()
      } catch (error) {
        console.log('新增地址失败')
      }
    },
    // 重置数据
    resetData () {
      // 清除form表单内容
      this.formInput = {
        regionId: '',
        provinceId: ''
      }
      // 关闭对话框
      this.showDialog = false
      // 清除id
      this.addId = undefined
    }
  },
  mounted () {
    this.getRegionList()
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
