<template>
  <div class="comment-text">
    <div class="cmt-warpper">
      <h4 class="cmt-titel">评论</h4>
      <!-- 评论框发表评论框 -->
      <el-input
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 4}"
        placeholder="请输入内容"
        v-model="form.content"
        min-height="33px"
        class="textarea"
      ></el-input>
      <el-row type="flex" justify="space-between">
        <!-- 评论框图案上传功能 -->
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
          :file-list="fileList"
          class="upload"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible" size="tiny">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
        <!--  提交按钮评论 -->
        <el-button
          type="primary"
          style="height:28px;width:56px;padding: 7px 15px;"
          @click="addConment"
        >提交</el-button>
      </el-row>
    </div>
    <!-- 评论回复框 -->
    <!-- 一级循环 -->
    <div class="cmt-list" v-if="commentList.length">
      <div class="cmt-item" v-for="(item,i) in commentList" :key="i+Math.random(100)">
        <span class="cmt-index">{{item|findex}}</span>
        <div class="cmt-info">
          <img class="head" src="http://127.0.0.1:1337/assets/images/avatar.jpg" />
          <span class="name">{{item.account.nickname}}</span>
          <span class="time">{{item.updated_at|formatDate}}</span>
          <div class="comment">
            <!-- 二级循环 -->
            <DetailComment2 v-if="item.parent" :item="item.parent"  @ReplyComment="ReplyComment" :index="item|index" />
            <p style="font-size:14px;color:black;">{{item.content}}</p>
            <span
              class="replybtn"
              style="float:right;"
              @click="ReplyComment"
            >回复</span>
            <div class="img" v-if="item.pics.length">
              <div
                :style="`background-image: url('http://157.122.54.189:9095${item.pics[0].url}');`"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="nocomments" v-else>
      空空如也，快去
      <span @click="ReplyComment">评论</span>吧~
    </div>
    <!-- 分页功能 -->
    <div class="block" style="margin-top:10px;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page._start"
        :page-sizes="[2, 4, 6, 8]"
        :page-size="page._limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import DetailComment2 from "@/components/post/postcomment/detailComment2.vue";
export default {
  components: {
    DetailComment2
  },
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      // 分页数据
      page: {
        post: 0,
        _start: 1,
        _limit: 2
      },
      // 总条数
      total: 0,
      //评论的数据
      commentList: [],
      //文件上传时的数据
      form: {
        content: "",
        pics: [],
        post: 0
      },
      // 图案墙的集合
      fileList: []
    };
  },
  methods: {
    // 回复
    /*  reply(item) {
      let user = item.account;
      user.ryid = item.id;
      this.$emit("greplyuser", user);
    }, */
    //移除图片
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    //处理图片卡预览
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
      console.log(123456);
      console.log(this.dialogImageUrl);
    },
    //图片上传成功时触发的钩子函数
    handleSuccess(response, file, fileList) {
      console.log(response);
      if (response.meta.status === 200) {
        // 我们要的数据就在response，我们要将上传成功之后的图片的路径(相对路径)存储到addForm的pics中
        this.form.pics.push({ pic: response.data.tmp_path });
      }
    },
    // 修改分页条数时候触发
    handleSizeChange(size) {
      // 修改分页条数
      this.page._limit = size;
      //重新发请求获取文章评论数据
      this.getCommentList();
    },

    // 切换页数时候触发
    handleCurrentChange(pagenum) {
      // 修改页数
      this.page._start = pagenum;

      //重新发请求获取文章评论数据
      this.getCommentList();
    },
    //添加评论
    addConment() {
      //添加评论前先判断token是否存在，如果不存在则跳到登录页，存在则添加内容
      var token = this.$store.state.user.userInfo.token;
      if (!token) {
        this.$message({
          message: "请先登录",
          type: "error"
        });
        this.$router.replace({ path: "/user/login" });
        return false;
      }
    },
    // 点击回复按钮时聚焦到评论框添加评论
    ReplyComment() {
      console.log(12345);
    },
    // 获取文章评论
    getCommentList() {
      let params = { ...this.page };
      params._start = params._start - 1;
      this.$axios({
        url: "/posts/comments",
        params
      })
        .then(res => {
          this.commentList = res.data.data;
          this.total = res.data.total;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.page.post = this.$route.query.id;
    this.getCommentList();
  },
  filters: {
    //将时间格式化
    formatDate: function(value) {
      let date = new Date(value);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? "0" + MM : MM;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let m = date.getMinutes();
      m = m < 10 ? "0" + m : m;
      let s = date.getSeconds();
      s = s < 10 ? "0" + s : s;
      return y + "-" + MM + "-" + d + " " + h + ":" + m + ":" + s;
    },
    // 计算parent个数
    index(item) {
      let index = 0;
      while (item.parent) {
        ++index;
        item = item.parent;
      }
      return index;
    },
    findex(item) {
      let index = 1;
      while (item.parent) {
        ++index;
        item = item.parent;
      }
      return index;
    }
  },
  // 监听路由的变化
  watch: {
    $route() {
      this.getCommentList();
    }
  }
};
</script>
<style lang="less" scoped>
.comment-text {
  width: 700px;
  .cmt-warpper {
    .cmt-titel {
      font-size: 18px;
      margin-bottom: 20px;
      font-weight: 400;
    }
    .textarea {
      margin-bottom: 10px;
    }
    .upload {
      margin-bottom: 30px;
      /deep/ .el-upload--picture-card {
        width: 100px;
        height: 100px;
        line-height: 100px;
      }
    }
  }
  .cmt-list {
    max-width: 700px;
    height: 100%;
    .cmt-item {
      padding: 20px 20px 5px;
      border: 1px solid #666;
      border-bottom: 1px dashed #666;
      .cmt-index {
        float: right;
        font-size: 12px;
      }
      .cmt-info {
        font-size: 12px;
        color: #666;
        margin-bottom: 10px;
        img {
          height: 16px;
          width: 16px;
        }
        .comment {
           .replybtn {
            display: none;
            bottom: 3px;
            right: 3px;
            font-size: 12px;
            color: royalblue;
            cursor: pointer;
            &:hover {
              text-decoration: underline;
            }
          }
          &:hover > .replybtn {
            display: block;
          }
        }
      }
    }
  }
  .nocomments {
    max-width: 700px;
    min-height: 70px;
    border: 1px solid #ddd;
    padding: 5px 10px;
  }
}
</style>
