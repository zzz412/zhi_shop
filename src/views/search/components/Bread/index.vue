<template>
  <!--面包屑-->
  <div class="bread">
      <ul class="fl sui-breadcrumb">
          <li>
              <a href="#">全部结果</a>
          </li>
      </ul>
      <ul class="fl sui-tag">
        {{searchQuery}}
          <!-- 分类 面包屑 -->
          <li class="with-x" v-if="searchQuery.categoryName">
            {{searchQuery.categoryName}}<i>×</i>
          </li>
          <!-- 关键词 面包屑 -->
          <li class="with-x" v-if="searchQuery.keyword">
            {{searchQuery.keyword}}<i>×</i>
          </li>
          <!-- 品牌 面包屑 -->
          <li class="with-x" v-if="searchQuery.trademark">
            {{searchQuery.trademark.split(':')[1]}}<i>×</i>
          </li>
          <!-- 品牌 面包屑 -->
          <li class="with-x" v-for="attrs in searchQuery.props" :key="attrs">
            {{attrs.split(':')[1]}}<i>×</i>
          </li>
      </ul>
  </div>
</template>

<script>
export default {
  name: 'Bread',
  props: {
    searchQuery: Object
  }
}
</script>

<style lang="scss" scoped>
.bread{
  margin-bottom: 5px;
  overflow: hidden;
  .sui-breadcrumb{
      padding: 3px 15px;
      margin: 0;
      font-weight: 400;
      border-radius: 3px;
      float:left;
      li{
          display: inline-block;
          line-height: 18px;
          a{
              color: #666;
              text-decoration: none;
              &:hover{
                  color: #4cb9fc;
              }
          }
      }
  }
  .sui-tag{
      margin-top: -5px;
      list-style: none;
      font-size: 0;
      line-height: 0;
      padding: 5px 0 0;
      margin-bottom: 18px;
      float: left;
      .with-x{
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition:color 400ms;
          cursor: pointer;
          i{
              margin-left: 10px;
              cursor: pointer;
              font: 400 14px tahoma;
              display: inline-block;
              height: 100%;
              vertical-align: middle;
          }
          &:hover{
              color: #28a3ef;
          }
      }
  }
}
</style>
