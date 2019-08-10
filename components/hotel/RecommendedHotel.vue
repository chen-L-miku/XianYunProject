// 推荐酒店表格
<template>
  <div class="recommend">
    <el-row>
    
      <el-table
        v-for="(item,index) in data"
        :key="index"
        style="width: 100%"
        @cell-click="tiaozhuan(index)"
        class="form"
        :data="item.products"
        >
        <!-- <nuxt-link to="https://hotels.ctrip.com/hotel/694679.html"></nuxt-link> -->
        <el-table-column
          prop="name"
          label="价格来源">
        </el-table-column>
        <el-table-column
          prop="bestType"
          label="低价房型">
        </el-table-column>
        <el-table-column
          prop="price"
          label="最低价格/每晚">
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>
<script>
export default {
  data(){
    return{
      
    }
  },
  props: {
        data: {
            type: Array,
            default: [
            ]
        }
    },
    methods:{
      tiaozhuan(index){
        console.log(index);
        if(index==0){
          window.location.href = 'https://hotels.ctrip.com/hotel/694679.html'
        }
    }
  },
  mounted(){
    
  }
}
</script>
<style lang="less" scoped>
.form{
  cursor: pointer;
}
.recommend{
  margin-bottom:30px;
}
</style>
