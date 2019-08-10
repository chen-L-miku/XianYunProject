<template>
  <div class="item">
    <item v-if="item.parent" :item="item.parent" @reply="reply" :index="index-1" />
    <div class="head">
      <span class="name">{{item.account.nickname}}</span>
      <span class="time">{{item.updated_at|formatDate}}</span>
      <span class="index">{{index}}</span>
    </div>
    <div class="comment">
      <p>{{item.content}}</p>
      <span class="replybtn" @click="$emit('reply',item)">回复</span>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "item",
  // 父传子
  props: {
    item: {
      type: Object,
      dafault: {}
    },
    index: {
      type: Number,
      default: 0
    }
  },
  // 方法
  methods: {
    reply(item) {
      this.$emit("reply", item);
    }
  },
  // 过滤
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
    },}
};
</script>

<style lang='less' scoped>
.item > div:first {
  padding: 2px;
}
.item {
  position: relative;
  padding: 6px;
  border: 1px solid #ddd;
  background-color: #f9f9f9;
  font-size: 12px;
  line-height: 20px;
  // 头
  .head {
    position: relative;
    .name {
      margin-left: 10px;
      color: #333;
    }
    .time {
      color: #666;
    }
    // 索引
    .index {
      position: absolute;
      right: 0;
      top: 0;
      font-size: 12px;
      color: #ccc;
    }
  }
  .comment {
    margin: 5px 0;
    padding-left: 20px;
    // 索引

    > p {
      position: relative;
      font-size: 14px;
      color: black;
    }
    // 回复按钮
    > .replybtn {
      display: none;
      position: absolute;
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
</style>
