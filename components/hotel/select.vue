<template>
  <div class="select">
    <el-row
      justify="space-around"
      type="flex"
      style="border:1px solid #ededed;margin-top:10px;padding:10px 0 10px 20px"
    >
      <el-col :span="5" style="border-right:1px solid #ededed;padding-right:10px">
        <div class="grid-content bg-purple">
          <div class="clearfix" style="margin-bottom:8px">
            <span style="float: left;">价格</span>
<<<<<<< HEAD
            <span style="float:right;" >1-4000</span>
          </div>
          <div class="grid-content bg-purple">
            <el-slider v-model="value" @change="getprice(value)" :max='4000' :mix='1'></el-slider>
=======
            <span style="float:right;">1-4000</span>
          </div>
          <div class="grid-content bg-purple">
            <el-slider v-model="value"></el-slider>
>>>>>>> 06476ddadd60383c59a841b9f87f3783bac4987b
          </div>
        </div>
      </el-col>
      <el-col :span="5" style="border-right:1px solid #ededed;padding-left:10px">
        <div class="grid-content bg-purple">
          <p style="padding-bottom:10px">住宿等级</p>
          <el-dropdown>
            <span class="el-dropdown-link">
              {{str||'不限'}}
<<<<<<< HEAD
              <i class="el-icon-arrow-down el-icon--right" style="padding-left:40px"></i>
=======
              <i class="el-icon-arrow-down el-icon--right" style="padding-left:50px"></i>
>>>>>>> 06476ddadd60383c59a841b9f87f3783bac4987b
            </span>
            <el-dropdown-menu slot="dropdown" placement="top-start">
              <el-dropdown-item
                v-for="(item,index) in star"
                :key="index"
                @click.native="getStar(item)"
              >
                <i class="iconfont iconcircle"></i>
                {{item}}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
      <el-col :span="5" style="border-right:1px solid #ededed;padding-left:10px">
        <div class="grid-content bg-purple">
          <p style="padding-bottom:10px">住宿类型</p>
          <el-dropdown>
            <span class="el-dropdown-link">
              {{tion||'不限'}}
<<<<<<< HEAD
              <i class="el-icon-arrow-down el-icon--right" style="padding-left:40px"></i>
=======
              <i class="el-icon-arrow-down el-icon--right" style="padding-left:50px"></i>
>>>>>>> 06476ddadd60383c59a841b9f87f3783bac4987b
            </span>
            <el-dropdown-menu slot="dropdown" placement="top-start">
              <el-dropdown-item
                v-for="(item,index) in accommodation"
                :key="index"
                @click.native="getTion(item)"
              >
                <i class="iconfont iconcircle"></i>
                {{item}}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
      <el-col :span="5" style="border-right:1px solid #ededed;padding-left:10px">
        <div class="grid-content bg-purple">
          <p style="padding-bottom:10px">酒店设施</p>
          <el-dropdown name="不限">
            <span class="el-dropdown-link">
              {{litie||'不限'}}
<<<<<<< HEAD
              <i class="el-icon-arrow-down el-icon--right" style="padding-left:40px"></i>
=======
              <i class="el-icon-arrow-down el-icon--right" style="padding-left:50px"></i>
>>>>>>> 06476ddadd60383c59a841b9f87f3783bac4987b
            </span>
            <el-dropdown-menu slot="dropdown" placement="top-start">
              <el-dropdown-item
                v-for="(item,index) in facilities"
                :key="index"
                @click.native="getFacilitie(item)"
              >
                <i class="iconfont iconcircle"></i>
                {{item}}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
      <el-col :span="5" style="padding-left:10px">
        <div class="grid-content bg-purple">
          <p style="padding-bottom:10px">酒店设施</p>
          <el-dropdown name="不限">
            <span class="el-dropdown-link">
              {{brands||'不限'}}
              <i
                class="el-icon-arrow-down el-icon--right"
<<<<<<< HEAD
                style="padding-left:40px"
=======
                style="padding-left:50px"
>>>>>>> 06476ddadd60383c59a841b9f87f3783bac4987b
              ></i>
            </span>
            <el-dropdown-menu slot="dropdown" placement="top-start" style="overflow:scroll;">
              <el-dropdown-item
                v-for="(item,index) in brand"
                :key="index"
                @click.native="getBrand(item)"
              >
                <i class="iconfont iconcircle"></i>
                {{item}}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  // props:{
  //   data:{
  //     type:Array,
  //     default:{

  //     }
  //   }
  // },
  data() {
    return {
      value: 0,
      value1: "",
      // 星级
      star: [],
      // 类型
      accommodation: [],
      // 设施
      facilities: [],
      // 品牌
      brand: [],
      str: "",
      brands: "",
      litie: "",
      tion: "",
      allList: []
    };
  },
  methods: {
<<<<<<< HEAD
    getprice(value){
      console.log('sss',value);
      if(value<2000){
        this.$message({
          type:'warning',
          message:'没有匹配的价格'
        })
      }else if(value>2000){
        this.$message({
          type:'warning',
          message:'抱歉'
        })
      }
    },
=======
>>>>>>> 06476ddadd60383c59a841b9f87f3783bac4987b
    getStar(item) {
      this.str = item;
      this.$emit("setSelect", item);
    },
    getBrand(item) {
      console.log("品牌", item);
      this.brands = item;
<<<<<<< HEAD
       this.$emit("gethotel",this.brands);
=======
      //  let hotel=this.brand.filter(value=>{
      //   return value.name===item
      // })
       this.$emit("gethotel",hotel);
>>>>>>> 06476ddadd60383c59a841b9f87f3783bac4987b
    },
    getFacilitie(item) {
      console.log("设施", item);
      this.litie = item;
       // 设施
      // let allasset = [];
      let allasset=this.facilities.filter(value=>{
        return value.name===item
      })
      // this.facilities = asset;
       this.$emit("getLitie",allasset);
    },
    getTion(item) {
      console.log("类型", item);
      this.tion = item;
       this.$emit("gettion", item);
    }
  },
  mounted() {
    this.$axios({
      url: "/hotels/options"
    }).then(res => {
      // this.allList=res.data.data
      console.log("下拉", res.data.data);
      let { assets, levels, types, brands } = res.data.data;

      // 设施
      let asset = [];
      assets.forEach(function(item, index) {
        asset.push(item.name);
      });
      this.facilities = asset;
      // 星级
      let level = [];
      levels.forEach(function(item, index) {
        level.push(item.name);
      });
      this.star = level;
      // 类型
      let allType = [];
      types.forEach(function(item, index) {
        allType.push(item.name);
      });
      this.accommodation = allType;
      // 品牌
      let brand = [];
      brands.forEach(function(item, index) {
        brand.push(item.name);
      });
      let allbrand = [];
      brands.forEach(function(item, index) {
        allbrand.push(item.name);
      });
      brand.concat(allbrand);
      this.brand = brand;
      // console.log("数组", this.brand);
    });
  }
};
</script>
<style lang="less" scoped>
.el-dropdown-link {
  cursor: pointer;
}
.el-icon-arrow-down {
  font-size: 12px;
  margin-left: 50px;
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
