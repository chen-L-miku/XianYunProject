<template>
  <div class="cmt-list" v-if="commentList.length">
    <div class="cmt-item" v-for="(item,i) in commentList" :key="i+Math.random(100)">
      <span class="cmt-index">{{item|findex}}</span>
      <div class="cmt-info">
        <img class="head" src="http://127.0.0.1:1337/assets/images/avatar.jpg" />
        <span class="name">{{item.account.nickname}}</span>
        <span class="time">{{item.updated_at|formatDate}}</span>
        <div class="comment">
          <!-- 二级循环 -->
          <DetailComment2
            v-if="item.parent"
            :item="item.parent"
            @reply="reply"
            :index="item|index"
          />
          <p>{{item.content}}</p>
          <span class="replybtn" style="float:right;" @click="ReplyComment">回复</span>
          <div class="img" v-if="item.pics.length">
            <div :style="`background-image: url('http://157.122.54.189:9095${item.pics[0].url}');`"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="less" scoped>
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
    }
  }
}
</style>
