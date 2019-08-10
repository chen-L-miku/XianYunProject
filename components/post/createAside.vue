<template>
  <div class="createAside">
    <el-col class="gt" :span="4">
      <div class="grid-content bg-purple drafts">
        {{`草稿箱（${data.num}）`}}
        <div style="margin: 10px 0" v-for="(item,index) in data.save" :key="index">
          <!-- <i :class="item.writes"></i> -->
          <el-link :underline="false" class="enter" @click="reStrategy(item)">
            <span>
              {{item.title}}
              <i :class="item.writes"></i>
            </span>
          </el-link>
          <div style="font-size: 12px;color: #999">{{item.saveDate}}</div>
        </div>
      </div>
    </el-col>
  </div>
</template>
<script>
export default {
    props: {
        data: {
            type: Object,
            default: {
                num: 0,
                save: []
            }
        }
    },
    created () {
        if (!this.data.num) {
            this.data.num = 0
        }
    }
};
</script>
<style lang="less" scoped>
.drafts {
    width: 220px;
    // min-height: 50px;
    padding: 10px;
    border: 1px solid #ddd;
    box-sizing: border-box;
    // text-align: center;
    color: rgb(112, 109, 109);
    .enter:hover {
      text-decoration:underline;
      color: orangered;
    }
  }
</style>
