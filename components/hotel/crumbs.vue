<template>
  <div class="container">
  
    <el-row class="crumbs" v-for="(item,index) in data" :key="index">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/hotel' }">{{item.big_cate}}</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/hotel' }">{{item.real_city}}酒店</el-breadcrumb-item>
        <el-breadcrumb-item>{{item.name}}</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>

    <el-row class="header" v-for="(item,index) in data" :key="index">
      <h2>{{item.name}}</h2>
      <span>{{item.alias}}</span>
      <p class="el-icon-location">:{{item.address}}</p>
    </el-row>
  </div>
</template>
<script>
export default {
  props: {
        data: {
            type: Array,
            default: [
            ]
        }
    },
    mounted(){
      setTimeout(() =>{
 console.log(this.data);
      },2000)
     
      
    }
};

</script>
<style lang="less" scoped>
.container {
  margin-bottom:35px;
  .crumbs {
    margin:20px 0;
    }
  .header {
    h2 {
      font-weight: 500;
    }
    span{
      font-size: 13px;
      display: block;
    }
    p{
      font-size:14px;
    }
  }
}
</style>
