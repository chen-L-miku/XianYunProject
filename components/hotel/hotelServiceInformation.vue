<template>
  <div>
    <!-- 基本信息 -->
    <el-row type="flex" justify="space-between"
    v-for="(item,index) in data" :key="index" class="message">
      <p :span='1' class="header">基本信息</p>
      <p>入住时间:{{item.enterTime}}之后</p>
      <p>离店时间:{{item.leftTime}}之前</p>
      <p>{{item.creation_time}}/{{item.renovat_time}}</p>
      <p>酒店规模:{{item.roomCount}}间客房</p>
    </el-row>
    <el-divider></el-divider>
    <!-- 主要设施 -->
    <el-row type="flex" justify="space-between"
    v-for="(item,index) in data" :key="index" class="message">
      <p class="header">主要设施</p>
      <el-tag type="info">外币兑换服务</el-tag>
      <el-tag type="info">电梯</el-tag>
      <el-tag type="info">洗衣服务</el-tag>
      <el-tag type="info">热水壶</el-tag>
      <el-tag type="info">{{item.traffic}}</el-tag>
    </el-row>
    <el-divider></el-divider>
    <!-- 停车服务 -->
    <el-row type="flex" justify="space-between"
    class="message">
      <p class="header">主要设施</p>
      <p>-</p>
      <p>-</p>
      <p>-</p>
      <p>-</p>
      <p>-</p>
    </el-row>
    <el-divider></el-divider>
    <!-- 品牌信息 -->
    <el-row type="flex" justify="space-between"
    v-for="(item,index) in data" :key="index" class="message">
      <p class="header">品牌信息</p>
      <p>-</p>
      <p>-</p>
      <p>-</p>
      <p>-</p>
      <p>-</p>
    </el-row>
    <el-divider></el-divider>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    data: {
      type: Array,
      default: []
    }
  },
  mounted(){
    setTimeout(() =>{
 console.log(this.data);
      },2005)
    
  }
};
</script>
<style lang="less" scoped>
.message{
  p{
    color: #666;
    // padding:20px 0
  };
  .header{
    font-weight: 500; 
    color: #000;
    text-align: left;
 }
}

</style>
