<template>
  <div class="menus-wrapper">
    <div class="menus-body">
      <ul class="menu">
        <li
          class="menu-item"
          v-for="(item, index) in menusList"
          :key="index"
          :class="{active:index===getindex}"
          @mouseover="getmenuindex(index)"
          @mouseout="clearvshow()"
        >
          <span>{{item.type}}</span>
          <i class="el-icon-arrow-right"></i>
          <!-- hover时触发的 -->
          <div class="menu-item-active" v-show="getindex ===index ">
            <ul class="menu-item-second">
              <li v-for="(item2,index2) in item.children" :key="index2" >
                <el-link type="warning" style="font-style:italic;font-size:20px;margin:0 10px 0 5px;">{{index2+1}}</el-link>
                <el-link type="warning" style="margin-right:5px" @click="getpostbycity(item2.city)">{{item2.city}}</el-link>
                <el-link type="warning" style="color:#999999" @click="getpostbycity(item2.city)">{{ item2.desc}}</el-link>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
    <div class="aside-recommend">
      <h4 class="aside-title">推荐城市</h4>
      <a href="post#">
        <img src="http://157.122.54.189:9093/images/pic_sea.jpeg" alt />
      </a>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
        getindex:'',
      menusList: [
        {children:[]}
      ]
    //   list:[]
    };
  },
  mounted() {
    //   获取菜单数据
    this.$axios({
      url: "/posts/cities"
    }).then(res => {
        console.log(res)
      this.menusList = res.data.data;
    });
  },
  methods:{
      // 跳转选定城市方法
      getpostbycity(city){
        this.$router.push(`/post?city=${city}`)

        this.$emit('getCityName',city)
      },
      // 为了城市名称显示在input上,发射事件,先将数据传递给父组件


    // 鼠标移入菜单
      getmenuindex(index){
        // console.log(index)
          this.getindex=index
        //  this.list =  this.menusList[index].children
        //  console.log(this.list)
      },
      // 鼠标移除菜单
      clearvshow(){
        this.getindex=''
      }
  }
//   created(){
//       let index = this.getindex
//       console.log(this.menusList[0].children)
//   }
};
</script>
<style lang="less" scoped>
.menus-body {
  position: relative;
  .menu {
    width: 260px;
    border: 1px solid #ddd;
    border-right: none;
    border-bottom: none;
    box-shadow: 0 0 1px #f5f5f5;
    z-index: 2;
    .menu-item {
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #ddd;
      border-right: 1px solid #ddd;
      padding: 0 20px;
      font-size: 14px;
      z-index: 2;
      i {
        margin-left: 140px;
      }
      .menu-item-active {
        width: 300px;
        border: 1px solid #ddd;
        position: absolute;
        left: 259px;
        top: 0;
        background-color: #fff;
      }
    }
    .active {
      background: #ffffff;

      color: orange;
      border-left: 0px solid orange;
    }
  }
}
.aside-recommend {
  margin-top: 20px;
  .aside-title {
    font-weight: 400;
    width:260px;
    padding-bottom: 10px;
    border-bottom: 1px solid #ddd;
    margin-bottom: 10px;
  }
  a {
    // display: block;
    width: 260px;
    height: 174px;
    img {
      width: 100%;
    }
  }
}
</style>


