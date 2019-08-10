<template xmlns:v-quill='富文本编辑器'>
  <div class="container">
    <el-row :gutter="70">
      <createForm @getDraft = "deal" :data = "items"></createForm>
      <createAside @emitItem = "deals" :data = "saves"></createAside>
    </el-row>
  </div>
</template>
<script>
import createForm from '@/components/post/createForm'
import createAside from '@/components/post/createAside'
export default {
  data () {
      return {
        saves: {},
        items: {}
      }
  },
  components: {
    createForm,
    createAside
  },
  methods: {
    deal (data) {
        this.saves = data
    },
    deals (data) {
        this.items = data
    }
  }
};
</script>


<style lang="less" scoped>
//   .container {
//    width:100%;
//    max-width:700px;
//     margin:0 auto;
//     padding:30px 0;
//   }
// .quill-editor {
//     min-height:200px;
//     overflow-y:auto;
// }
// * {
//     margin: 0;
//     padding: 0
// }
.container {
  width: 1000px;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 20px 80px 20px 5px;
}
</style>



