<template>
 <!-- 底部 -->
  <div class="copyright">
    <ul>
      <li>关于我们</li>
      <li>联系我们</li>
      <li>联系客服</li>
      <li>商家入驻</li>
      <li>营销中心</li>
      <li>手机智品汇</li>
      <li>销售联盟</li>
      <li>智品汇社区</li>
    </ul>

    <div class="address">地址：长沙市岳麓区湖南众智互联网学院</div>
    <div class="beian">湘ICP备19006430号</div>
  </div>
</template>

<script>
export default {
  name: 'AppCopyright'
}
</script>

<style lang="scss" scoped>
.copyright{
    width: 1200px;
      margin: 0 auto;
    text-align: center;
      line-height: 24px;
    ul{
      li{
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
}
</style>
