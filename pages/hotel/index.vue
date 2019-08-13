<<<<<<< HEAD
=======
<<<<<<< HEAD

=======
>>>>>>> 06476ddadd60383c59a841b9f87f3783bac4987b
<template>
  <div class="hotel">
    <!-- 面包屑 -->
    <div class="head">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">酒店</el-breadcrumb-item>
        <el-breadcrumb-item>{{val||'南京'}}市酒店预订</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- input表单 -->
    <div class="hotels">
      <Hotels @getAddress="getAddress" />
    </div>
    <!-- 下拉列表 -->
    <div class="select">
      <Select @setSelect="setSelect " @gettion="gettion" @getLitie="getLitie" @gethotel="gethotel" />
    </div>
    <!-- 酒店列表 -->
<<<<<<< HEAD
    <div class="hotelList" >
=======
    <div class="hotelList">
>>>>>>> 06476ddadd60383c59a841b9f87f3783bac4987b
      <!-- 里面有几条数据子组件就会循环几次,就会展示几条 -->
      <HotelList :data="hotelList" />
    </div>
    <div class="clearfix">
      <!-- 分页 -->
      <!-- @size-change：修改条数时候触发
                    @current-change：修改页数时候触发
                    current-page：当前页面
                    page-size：当前页面显示的条数
      total：总条数-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[1, 2, 3, 4]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        style="float:right;margin-top:20px"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import Hotels from "@/components/hotel/hotels";
import Select from "@/components/hotel/select";
import HotelList from "@/components/hotel/hotelList";
export default {
  data() {
    return {
      pageNum: 2,
      pageSize: 2,
      total: 0,
      val: "",
      // 展示数据的数组
      hotelList: [],
      // 全部数据的数组
      allHotelList: [],
      allHotel: []
    };
  },
  mounted() {
    this.$axios({
      url: "/hotels"
    }).then(res => {
      this.allHotelList = res.data.data;
      // this.allHotel=res.data.data.slice(0)
      this.allHotel = [...res.data.data];
      this.total = this.allHotelList.length;
      //  一开始默认展示条数
      this.hotelList = this.allHotelList.slice(0, 2);
      console.log("小酒店", this.allHotelList);
    });
  },
  methods: {
    // 酒店
    gethotel(hotel) {
      let sethotel = this.allHotel.filter(value => {
        return value.name === hotel;
      });
      console.log("xiao", sethotel);
      if (sethotel) {
        this.pageNum = 1;
        this.hotelList = sethotel;
        this.total = sethotel.length;
      }
    },
    // 设施
    getLitie(arr) {
      if (arr) {
        this.pageNum = 1;
        this.hotelList = arr;
        this.total = arr.length;
      }
    },
    // 类型
    gettion(name) {
      let hoteltype = [];
      this.allHotel.forEach(function(item, index) {
        if (item.hoteltype.name) {
          hoteltype.push(item);
        }
      });
      let allHoteltype = hoteltype.filter(item => {
        return item.hoteltype.name === name;
      });
<<<<<<< HEAD
      // console.log("第三次", allHoteltype);
=======
      console.log("第三次", allHoteltype);
>>>>>>> 06476ddadd60383c59a841b9f87f3783bac4987b
      if (allHoteltype) {
        this.pageNum = 1;
        this.hotelList = allHoteltype;
        this.total = allHoteltype.length;
      }
    },

    // 星级筛选
    setSelect(str) {
      let allstry = [];
      this.allHotel.forEach(function(item, index) {
        if (item.hotellevel) {
          allstry.push(item);
        }
      });
      let allstar = allstry.filter(item => {
        return item.hotellevel.name === str;
      });
      if (allstar) {
        this.pageNum = 1;
        console.log("第三次", allstar);
        this.hotelList = allstar;
        this.total = allstar.length;
      }
    },
    //   pageSize 改变时会触发
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.setList();
    },
    // currentPage 改变时会触发
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.pageNum = val;
      this.setList();
    },
    // 接收子组件的数据
    getAddress(add) {
      this.val = add;
    },
    setTotal() {},
    // 根据传进来的每页需要展示的条数或者当前码数来重新计算,提取到的值就作为展示的值
    setList() {
      this.hotelList = this.allHotelList.slice(
        (this.pageNum - 1) * this.pageSize,
        (this.pageNum - 1) * this.pageSize + this.pageSize
      );
    }
  },
  components: {
    Hotels,
    Select,
    HotelList
  }
};
</script>
<style lang="less" scoped>
.hotel {
  width: 1000px;
  margin: 0 auto;
  color: #606266;
  .head {
    margin: 15px 0 15px 0;
  }
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
<<<<<<< HEAD
=======
>>>>>>> ebe3fd72364b23a123bbc21ae3240e54443e1ff1
>>>>>>> 06476ddadd60383c59a841b9f87f3783bac4987b
