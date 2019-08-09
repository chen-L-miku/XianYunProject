<template>
  <div class="slideshow">
    <el-row type="flex" justify="space-between">
      <div class="carousel-left">
        <img :src="path">
      </div>
      <el-row class="carousel-right">
        <img 
        v-for="(item,index) in Image"
        :key="index"
        :src='item'
        @click="wowaka(item)">
      </el-row>
    </el-row>
  </div>
</template>
<script>
export default {
  data(){
    return{
      path:'/1.jpg',
      Image:[
        "/1.jpg",
        "/2.jpg",
        "/3.jpg",
        "/4.jpg",
        "/5.jpg",
        "/6.jpg",
      ]
    }
  },
  methods:{
    wowaka(item){
      this.path = item
    }
  },
  
}
</script>
<style lang="less" scoped>
.slideshow{
  margin-bottom: 20px;
  .carousel-left{
  flex: 2;
  // background-color: #f00;
  overflow: hidden;
  height: 353px;
  img{
    width: 640px;
    height: 360px;
  }
}
.carousel-right{
  flex: 1;
  // background-color: #00f;
  width: 100%;
  text-align: right;
  img{
    width: 47%;
    padding: 0 5px;
    margin-bottom:10px;
  }

}
}

</style>
