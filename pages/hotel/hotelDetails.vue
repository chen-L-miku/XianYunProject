<template>
  <div class="basics">
    <!-- 面包屑与酒店名称 -->
    <Crumbs :data="listData"/>
    
    <!-- 轮播图 -->
    <Carousel/>

    <!-- 推荐酒店表格 -->
    <RecommendedHotel :data="listData"/>

    <!-- 酒店详细地图 -->
    <DetailMap :data="listData"/>

    <!-- 酒店服务 -->
    <HotelServiceInformation :data="listData"/>

    <!-- 顾客评论 -->
    <CustomerReview  :data="listData"/>
  </div>
  
</template>
<script>
import Crumbs from "@/components/hotel/crumbs";
import Carousel from "@/components/hotel/carousel";
import RecommendedHotel from "@/components/hotel/RecommendedHotel";
import DetailMap from "@/components/hotel/detailMap";
import HotelServiceInformation from "@/components/hotel/hotelServiceInformation";
import CustomerReview from "@/components/hotel/customerReview";
export default {
  data(){
    return{
     getdata:{
        id:18 //酒店id(酒店详情)
     },
      listData:[]
    }
  },
  components:{
    Crumbs,
    Carousel,
    RecommendedHotel,
    DetailMap,
    HotelServiceInformation,
    CustomerReview
  },
  methods:{
    getDataList(){
      this.$axios({
        url:'/hotels',
        method:'get',
        params:this.getdata
      }).then((res) => {
        // console.log(this.listData);
        
        this.listData = res.data.data
        // console.log(this.listData);
      }).catch((err) => {
        console.log(err);
        
      });
    }
  },
  mounted(){
    this.getDataList() 
  }

}
</script>
<style lang="less" scoped>
.basics{
  width: 1000px;
  margin: 0 auto;
}
</style>
