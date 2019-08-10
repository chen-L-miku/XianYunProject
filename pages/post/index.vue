<template>
  <div class="container">
    <el-row type="flex" justify='space-between'>
      
          <div class="postleft">
            <asideMenus @getCityName='getCityName'/>
          </div>

          <div class="postright">
            <postList :data='cityName'/>
          </div>

    </el-row>
  </div>
</template>
<script>
import asideMenus from "@/components/post/asideMenus.vue";
import postList from "@/components/post/postList.vue";
export default {
  data() {
    return {
      cityName:''
    };
  },
  components: {
    asideMenus,
    postList
  },
  methods:{
    getCityName(data){
      console.log('城市名称',data)
      this.cityName=data
    }
  }
};
</script>
<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 10px auto;

  .postleft{
    width:300px;
    // border: 1px solid red;
    z-index: 3;
  }
  .postright{
    width:700px;
    // border: 1px solid red;
    z-index: 1;
    margin-left: 20px;
  }
}
</style>






