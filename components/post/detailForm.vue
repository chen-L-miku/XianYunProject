<template>
  <div class="main">
    <!-- 面包屑导航栏 -->
    <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item :to="{ path: '/post' }">旅游攻略</el-breadcrumb-item>
      <el-breadcrumb-item>攻略详情</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 攻略详情内容 -->
    <div class="post-detail">
      <h1>{{articleData.title}}</h1>
      <div class="post-info">
        <span>攻略:{{articleData.created_at| formatDate}}</span>
        <span>阅读:{{articleData.watch}}</span>
      </div>
      <div class="post-content" v-html="articleData.content"></div>
      <!-- 点赞分享的组件 -->
      <div class="post-ctrl">
        <el-row type="flex" justify="center">
          <span>
            <i class="iconfont iconpinglun"></i>
            <p>评论({{articleData.length ||0}})</p>
          </span>
          <span @click="getStar">
            <i class="iconfont iconstar1" ref="btnClick"></i>
            <p>收藏</p>
          </span>
          <span>
            <i class="iconfont iconfenxiang"></i>
            <p>分享</p>
          </span>
          <span @click="getLike">
            <i class="iconfont iconding"></i>
            <p>点赞({{articleData.like ||0}})</p>
          </span>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      articleData: [{}]
    };
  },
  methods: {
    //点赞
    getLike() {
      var id = this.$route.query.id;
      var token = this.$store.state.user.userInfo.token;
      if (!token) {
        this.$message({
          message: "请先登录",
          type: "error"
        });
        this.$router.replace({ path: "/user/login" });
      }
      this.$axios({
        url: "/posts/like",
        headers: {
          //设置请求头
          Authorization: `Bearer ${token}`
        },
        params: {
          id
        }
      })
        .then(res => {
          console.log(res);
          this.articleData.like += 1;
          this.$message({
            message: "点赞成功",
            type: "success"
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    //收藏
    getStar() {
      var id = this.$route.query.id;
      var token = this.$store.state.user.userInfo.token;
      if (!token) {
        this.$message({
          message: "请先登录",
          type: "error"
        });
        this.$router.replace({ path: "/user/login" });
      }
      this.$axios({
        url: "/posts/star",
        headers: {
          //设置请求头
          Authorization: `Bearer ${token}`
        },
        params: {
          id
        }
      })
        .then(res => {
          console.log(res);
          this.$message({
            message: "收藏成功",
            type: "success"
          });
          this.$refs.btnClick.style.color = "green";
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取文章详情
    getAtrText() {
      this.$axios({
        url: "/posts",
        params: this.$route.query
      })
        .then(res => {
          console.log(res);
          this.articleData = res.data.data[0];
          console.log(this.articleData);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  watch: {
    $route() {
      this.getAtrText();
    }
  },
  mounted() {
    this.getAtrText();
  },
  filters: {
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
    }
  }
};
</script>
<style lang="less" scoped>
.main {
  width: 700px;
  .breadcrumb {
    font-size: 14px;
    line-height: 1;
  }
  .post-detail {
    h1 {
      padding: 20px 0;
      border-bottom: 1px solid #ddd;
    }
    .post-info {
      color: #999;
      padding: 20px;
      text-align: right;
      span {
        margin-left: 20px;
      }
    }
    .post-content {
      /deep/img {
        max-width: 700px !important;
      }
      line-height: 1.5;
      margin: 10px 0;
    }
    .post-ctrl {
      padding: 50px 0 30px;
      span {
        margin: 0 20px;
        font-size: 20px;
        text-align: center;
        cursor: pointer;
        i {
          display: block;
          font-size: 30px;
          color: orange;
        }
        p {
          margin-top: 5px;
          font-size: 14px;
          color: #999;
        }
      }
    }
  }
}
</style>
