<template>
  <div class="postcontainer">
    <!-- 头部部分 -->
    <div class="postheader">
      <el-row type="flex" align="middle" class="search-input">
        <input ref='inputcity' placeholder=" 请输入想去的地方,比如:'广州'" @keyup.enter='getpostsbyrecity(valuecity)'  v-model="valuecity" />
        <i class="el-icon-search" style="color:orange" @click='getpostsbyrecity(valuecity)'></i>
      </el-row>
      <div style="font-size:14px;margin-top:5px;">
        推荐: &nbsp;&nbsp;
        <el-link type="info" v-for="(item,index) in cityList" :key="index" @click="getpostsbyrecity(item)" style="margin-right:10px;">{{item}}</el-link>
      </div>

      <el-row class="postplan" type="flex" justify="space-between">
        <div>推荐攻略</div>
        <el-button type="primary" icon="el-icon-edit" style="height:40px;margin-top:10px;" @click="$router.push('/post/create')">写游记</el-button>
      </el-row>
    </div>

    <!-- 文章渲染 -->
    <div class="postlist" v-for="(item,index) in dataList" :key="index">
      <h3 @click="topostdetail(item.id)">{{item.title}}</h3>
      <p v-html="item.summary" @click="topostdetail(item.id)" style="color:#666666"></p>
      <el-row type="flex" justify="space-between">
        <img :src="item2" v-for="(item2,index2) in item.images" :key="index2" @click="topostdetail(item.id)" class="postimg"/>
      </el-row>
      <el-row
        type="flex"
        justify="space-between"
        style=" height:20px;line-height:20px;font-size:10px; margin:5px 0"
      >
        <el-row type="flex" justify="space-between">
          <span style="margin-right:10px;">
            <i class="el-icon-location-outline">&nbsp;&nbsp;{{item.cityName}}&nbsp;&nbsp;&nbsp;&nbsp;by</i>
          </span>
          <img
            src="http://157.122.54.189:9095/assets/images/avatar.jpg"
            style="display:block;width:16px;height:16px;vertical-align: middle;"
          />
          <span style="color:orange;">{{item.account.nickname}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
          <span>
            <i class="el-icon-view">{{item.watch}}</i>
          </span>
        </el-row>
        <span style="font-size:18px;color:orange">{{item.watch}}赞</span>
      </el-row>
    </div>


    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageIndex"
      :page-sizes="[2, 4, 6, 10]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>
<script>
export default {
  props:{
    data:{
          type:String,
          default:''
    }
  },
  data() {
    return {
      valuecity:'',
      cityList:['广州','上海','北京','成都'],
      postList: [],
      dataList:[],
            // 当前页数
            pageIndex:1,
            // 显示条数
            pageSize:4,
            // 总条数
            total:0
    };
  },
  methods: {
    // 点击文章详情
    topostdetail(id){
      this.$router.push(`/post/detail?id=${id}`)
    },
        // 修改页数触发调用value为每页条数
        handleSizeChange(value){
            this.pageSize=value
            this.getDataList()
        },
        // 修改每页条数触发调用value为每页条数
        handleCurrentChange(value){
            this.pageIndex=value
            this.getDataList()
        },
        // 修改显示页数及条数
        getDataList(){
          this.dataList = this.postList.slice( 
               (this.pageIndex - 1) * this.pageSize,  
               (this.pageIndex  - 1) * this.pageSize + this.pageSize 
            );
        },
        // 点击推荐城市触发获取文章数据
        getpostsbyrecity(recity){
          if(recity){
            this.$router.push(`/post?city=${recity}`)
                
            this.valuecity=recity
          }else{
            return
          }

        },

    // 获取文章数据
    getpostsbyid() {
        // // 将点击跳转城市名称显示input
        // if(this.data){
        //   this.valuecity=this.data
        // }

      this.$axios({
        url: "posts",
        params:this.$route.query
      }).then(res => {
        console.log('文章数据',res);
        // 总数据
        this.postList = res.data.data;
        // 总页数
        this.total=this.postList.length

        this.dataList = this.postList.slice( 0, 4 );

      });
    }
  },
  mounted() {
    this.getpostsbyid();

  },
      // 通过路由监听参数变化,调用方法重新请求列表数据
    watch:{
        $route(){
            this.getpostsbyid()
        }
    }
};
</script>
<style lang="less" scoped>
.postcontainer {
  width: 700px;
  .postheader {
    .search-input {
      width: 700px;
      height: 30px;
      background: #fff;
      border-radius: 0 4px 4px 4px;
      border: 3px solid orange;
      box-sizing: unset;

      input {
        flex: 1;
        padding: 5px 13px;
        outline: none;
        border: 0;
        font-size: 14px;
      }

      .el-icon-search {
        cursor: pointer;
        font-size: 22px;
        padding: 0 10px;
        font-weight: bold;
      }
    }
    .postplan {
      border-bottom: 1px solid #f5f5f5;
      width: 700px;

      div {
        font-size: 20px;
        text-align: center;
        color: orange;
        height: 60px;
        width: 120px;
        line-height: 60px;
        border-bottom: 3px solid orange;
      }
    }
  }
  .postlist {
    margin: 30px 0;
    width: 700px;
    border-bottom: 1px solid #f5f5f5;
    overflow: hidden;
    h3 {
      font-weight: normal;
      margin-bottom: 10px;
      cursor: pointer;
    }
    p {
      width: 700px;
      height: 65px;
      // white-space: nowrap;
      width: 100%;
      overflow: hidden; /* "overflow" value must be different from "visible" */
      text-overflow: ellipsis;
      cursor: pointer;
    }
    .postimg {
      margin: 10px 10px;
      display: block;
      width: 220px;
      height: 150px;
      cursor: pointer;
    }
  }
}
</style>


