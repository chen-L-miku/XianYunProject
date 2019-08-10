<template>
  <div class="aside">
    <!-- 相关攻略部分内容 -->
    <h4 class="aside-title">相关攻略</h4>
    <el-container
      v-for="(item,index) in raidersText"
      :key="index"
      @click.native="RaidersArticle(item.id)"
      class="recommend-list"
    >
      <el-aside class="post-img" width="100px">
        <img :src="`${item.images}`" alt />
      </el-aside>
      <el-main class="post-text">
        <div class="post-text-title">{{item.title}}</div>
        <p>{{item.created_at|formatDate}} 阅读{{item.watch}}</p>
      </el-main>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      raidersText: [{}]
    };
  },

  methods: {
    // 点击路由跳转获取页面
    RaidersArticle(id) {
      this.$router.push(`/post/detail?id=${id}`);
      this.$emit("getDetailId", id);
    },
    //相关攻略数据
    getRaidersArticle() {
      /* let artId = this.$route.query.id; */
      this.$axios({
        url: "/posts/recommend"
      })
        .then(res => {
          this.raidersText = res.data.data;
        })
        .catch(err => {
          console.log(err)
        });
    }
  },
  mounted() {
    this.getRaidersArticle();
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
.aside {
  width: 280px;
  .aside-title {
    font-size: 18px;
    font-weight: 400;
    padding-bottom: 10px;
    border-bottom: 1px solid #ddd;
  }
  .recommend-list {
    width: 280px;
    height: 121px;
    border-bottom: 1px solid #ddd;
    padding: 20px 0;
    font-size: 16px;
    font-weight:500;
    .post-img {
      height: 80px;
      flex-shrink: 0;
      background: #ddd;
      overflow: hidden;
      margin-right: 10px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .post-text {
      padding: 0px;
      .post-text-title {
        width: 170px;
        height: 45px;
        margin-bottom: 18px;
      }
      p {
        font-size: 12px;
        color: #999;
      }
    }
  }
}
</style>