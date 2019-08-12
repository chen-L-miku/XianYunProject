<template>
  <div class="container">
    <el-row type="flex" justify="space-between">
      <div class="div">
        <DetailForm  :data='atrId'/>
        <DetailComment />
      </div>
      <DetailAside  @getDetailId='getDetailId' />
    </el-row>
  </div>
</template>
<script>
import DetailForm from "@/components/post/detailForm";
import DetailComment from "@/components/post/detailComment";
import DetailAside from "@/components/post/detailAside";
export default {
  data(){
     return{
        atrId:''
     }
  },
  components: {
    DetailForm,
    DetailComment,
    DetailAside
  },
  methods: {
    getDetailId(data){
      console.log('文章id',data)
      this.atrId=data
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 20px auto;
}
</style>
