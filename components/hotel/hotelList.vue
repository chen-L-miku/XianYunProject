<template>
  <div class="list">
    <!-- 循环数组展示数据在页面 -->
    <el-row
      style="margin-top:20px;padding-bottom:10px;border-bottom:1px solid #ededed;"
      v-for="(item,index) in data"
      :key="index"
    >
      <el-col :span="8">
        
          <!-- 动态展示图片 -->
          <img :src="item.photos" @click="getId(item.id)"/>
        
      </el-col>
      <el-col :span="8" style="margin-left:30px;line-height:28px">
        <div class="content">
          <nuxt-link to="#" style="font-size:20px;color:black">{{item.name}}</nuxt-link>
          <div>
            <i style="color:#999">{{item.alias}}</i>
            <i class="iconfont iconhuangguan" style="color:#f90"></i>
            <i class="iconfont iconhuangguan" style="color:#f90" ></i>
            <i class="iconfont iconhuangguan" style="color:#f90"></i>
            {{item.hoteltype.name}}
          </div>
          <div>
            <i class="el-rate__icon el-icon-star-on" style="color: rgb(247, 186, 42);"></i>
            <i class="el-rate__icon el-icon-star-on" style="color: rgb(247, 186, 42);"></i>
            <i class="el-rate__icon el-icon-star-on" style="color: rgb(247, 186, 42);"></i>
            <i class="el-rate__icon el-icon-star-on" style="color: rgb(239, 242, 247);">
              <i
                class="el-rate__decimal el-icon-star-on"
                style="color: rgb(247, 186, 42); width: 50%;"
              ></i>
            </i>
            <i class="el-rate__icon el-icon-star-on"></i>
            <span style="color:#f90">{{item.stars}}分</span>
            <span style="font-size:18px;padding-left:10px">
              <i style="color:#f90;font-size:30px;">36</i>条评价
            </span>
            <span style="font-size:18px; padding-left:10px">
              <i style="color:#f90;font-size:30px;">76</i>篇游记
            </span>
          </div>
          <div>
            <span>
              <i class="iconfont iconlocation"></i>
              位于: {{item.address}}
            </span>
          </div>
        </div>
      </el-col>
      <el-col :span="6" style="margin-left:30px;line-height:30px;">
        <nuxt-link
          to="#"
          style="border-bottom:1px solid #ededed;padding-left:10px"
          class="link"
          v-for="(value,index) in item.products"
          :key="index"
        >
          <span style>{{value.name}}</span>
          <span style="text-align:right;display: inline-block; ">
            <i style="color:#f90">￥{{value.price}}</i>
            起>
          </span>
        </nuxt-link>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  // 接收父组件传过来的值
  props: {
    data: {
      type: Array,
      default:[]
    }
  },
  data() {
    return {
    };
  },
  methods: {
    getId(id){
      console.log('id',id);
      this.$router.push({
        path:'/hotel/hotelDetails/'+id,
      })
    }
  }
};
</script>
<style lang="less" scoped>
.hotelList {
  margin-top: 30px;
  img {
    display: inline-block;
    width: 325px;
    height: 250px;
  }
}
a {
  display: block;
  line-height: 40px;
}
.link {
  display: flex;
  justify-content: space-between;
  line-height: 60px;
}
/*清除浮动*/
.clearfix::after {
  visibility: hidden;
  clear: both;
  display: block;
  content: ".";
  height: 0;
}
</style>
