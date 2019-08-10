<template>
  <div class="createForm">
    <el-col class="lf" :span="19">
      <h3 class="new">发表新攻略</h3>
      <span class="state">分享你的个人游记，让更多人看到哦！</span>
      <el-input v-model="caption" class="caption" placeholder="请输入标题"></el-input>
      <div
        class="quill-editor"
        :content="content"
        @change="onEditorChange($event)"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @ready="onEditorReady($event)"
        v-quill:myQuillEditor="editorOption"
      ></div>
      <el-form>
        <el-form-item class="selects" label="选择城市">
          <el-autocomplete
            v-model="selects"
            :fetch-suggestions="querySearchAsync"
            placeholder="请搜索游玩城市"
            @select="handleSelect"
          ></el-autocomplete>
        </el-form-item>
      </el-form>
      <el-button @click="handleIssue" type="primary">发布</el-button>
      <span class="states">或者</span>
      <el-link @click="handleSave" type="warning">保存到草稿</el-link>
    </el-col>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      default: {
        city: 0,
        title: "",
        quill: ""
      }
    }
  },
  data() {
    return {
      num: 0,
      save: [
        //保存时间el-icon-edit
      ],
      selects: "", //城市输入框的值
      cityId: "", //城市id
      caption: "", //标题输入框的值
      content: "", //富文本框的值
      editorOption: {
        // some quill options
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线
            // ["blockquote", "code-block"], // 引用  代码块
            [{ header: 1 }, { header: 2 }], // 1、2 级标题
            // [{ list: "ordered" }, { list: "bullet" }], // 有序、无序列表
            // [{ script: "sub" }, { script: "super" }], // 上标/下标
            // [{ indent: "-1" }, { indent: "+1" }], // 缩进
            // [{'direction': 'rtl'}],                         // 文本方向
            // [{ size: ["small", false, "large", "huge"] }], // 字体大小
            // [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
            // [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
            // [{ font: [] }], // 字体种类
            // [{ align: [] }], // 对齐方式
            // ["clean"], // 清除文本格式
            ["link", "image", "video"] // 链接、图片、视频
          ]
        }
      }
    };
  },
  watch: {
    data() {
      this.selects = this.data.city;
      this.caption = this.data.title;
      this.content = this.data.quill;
    }
  },
  mounted() {
    //console.log(555,this.$store); //this.$store.state.post.draft
    if (!this.$store.state.post.draft.slice(0)) {
      this.save = [];
    } else {
      this.save = this.$store.state.post.draft.slice(0);
      console.log(666, this.$store.state.post.draft.slice(0));
      this.num = this.save.length;
    }
    this.$emit("getDraft", { num: this.num, save: this.save });

    // console.log("app init, my quill insrance object is:", this.myQuillEditor);
    // setTimeout(() => {
    //   this.content = "";
    // }, 3000);
    // console.log(
    //   "111",
    //   JSON.parse(localStorage.getItem("create") || "[]").slice(-1)[0]
    // );

    // if (!JSON.parse(localStorage.getItem("create") || "[]").slice(-1)[0]) {
    //   this.save = [];
    // } else {
    //   this.save = JSON.parse(localStorage.getItem("create") || "[]").slice(
    //     -1
    //   )[0];
    //   this.num = this.save.length;
    //   if (JSON.parse(localStorage.getItem("create") || "[]").length>1) {
    //       const createx = JSON.parse(localStorage.getItem("create") || "[]").slice(-1);
    //       localStorage.setItem("create", JSON.stringify(createx));
    //   }
    // }

    // this.save = this.$store.state.create.draft
  },
  destroyed() {
    this.$store.commit("post/setDraft", this.save);
  },
  methods: {
    onEditorBlur(editor) {
      //失去焦点事件
      // console.log("editor blur!", editor);
    },
    onEditorFocus(editor) {
      //获得焦点事件
      // console.log("editor focus!", editor);
    },
    onEditorReady(editor) {
      // console.log("editor ready!", editor);
    },
    onEditorChange({ editor, html, text }) {
      //内容改变事件
      // console.log("editor change!", editor, html, text);
      this.content = html;
    },
    //输入游玩城市时触发
    querySearchAsync(queryString, callback) {
      if (!queryString) {
        callback([]);
        return;
      }
      this.$axios({
        url: "http://157.122.54.189:9095/airs/city", //本地的无效
        params: {
          name: queryString
        }
      }).then(res => {
        // console.log("游玩", res);
        const { data } = res.data;
        let newData = [];
        data.forEach(function(item, index) {
          item.value = item.name;
          newData.push(item);
        });
        // newData = [...new Set(newData)];
        // console.log(newData);
        callback(newData);
      });
    },
    //选择游玩城市时触发
    handleSelect(item) {
      // console.log('城市',item);
      this.selects = item.value;
      this.cityId = item.id;
    },
    // 点击发布时触发
    handleIssue() {
      console.log("测试发布参数", this.content, this.caption, this.cityId);
      // 标题不能为空
      if (!this.caption) {
        this.$confirm("请输入标题", "提示", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "warning"
        });
        return;
      }
      // 城市不能为空
      if (!this.selects) {
        this.$confirm("请输入游玩城市", "提示", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "warning"
        });
        return;
      }
      // console.log(999,this.$store)
      // 确认权限  没有权限时触发
      if (!this.$store.state.user.userInfo.token) {
        this.$confirm("请先登录再操作,按确认去登录", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "放弃发布",
          type: "warning"
        })
          .then(() => {
            this.$message({
              type: "warning",
              message: "稍等，正在跳转登录页"
            });
            setTimeout(() => {
              this.$router.push({ path: "/user/login" });
            }, 1000);
          })
          .catch(() => {
            this.$message({
              type: "warning",
              message: "您已取消发布"
            });
          });
        return;
      }
      // console.log('token',this.$store.state.user.userInfo.token);
      this.$axios({
        url: "/posts",
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
        },
        data: {
          content: this.content,
          title: this.caption,
          city: this.cityId
        }
      }).then(res => {
        this.$message.success("恭喜，发布成功！");
      });
    },
    // 点击保存到草稿箱时触发
    handleSave() {
      // 权限验证
      // if (!this.$store.state.user.userInfo.token) {
      //   this.$confirm("请先登录再操作,按确认返回登录页", "提示", {
      //     confirmButtonText: "确定",
      //     cancelButtonText: "放弃保存",
      //     type: "warning"
      //   })
      //   .then(() => {
      //     this.$message({
      //       type: "warning",
      //       message: "稍等，正在跳转登录页"
      //     });
      //     setTimeout(() => {
      //       this.$router.push({ path: "/user/login" });
      //     }, 1000);
      //   })
      //   .catch(() => {
      //     this.$message({
      //       type: "warning",
      //       message: "您已取消保存草稿"
      //     });
      //   });
      //   return;
      // }
      if (this.num < 5) {
        this.num += 1;
      }
      // 定义一个时间对象
      var now = new Date();
      // 获取具体时间
      var year = now.getFullYear();
      var month = now.getMonth() + 1; // 月份会少1  补上
      var date = now.getDate();
      // 时间小于10的情况补0
      if (month < 10) month = "0" + month;
      if (date < 10) date = "0" + date;
      // 根据时间格式使用字符串和数值的拼接来输出
      var formatDateTime = year + "-" + month + "-" + date;
      // console.log(formatDateTime)
      this.save.unshift({
        city: this.selects,
        quill: this.content,
        title: this.caption,
        saveDate: formatDateTime,
        writes: "el-icon-edit"
      });
      if (this.save.length > 5) {
        this.save.length = 5;
      }
      // const create = JSON.parse(localStorage.getItem("create") || "[]");
      // create.push(this.save);
      // localStorage.setItem("create", JSON.stringify(create));
      this.$emit("getDraft", { num: this.num, save: this.save });
    }
  }
};
</script>
<style lang="less" scoped>
.new {
  font-size: 22px;
  font-family: "simsun";
  line-height: 30px;
}
.state {
  font-size: 12px;
  color: rgb(145, 141, 141);
}
.caption {
  margin: 10px 0 20px;
}
.quill-editor {
  min-height: 400px;
  overflow-y: auto;
}
.states {
  width: 20px;
  margin: 0 3px 0 18px;
}
.selects {
  margin-top: 15px;
}
</style>
