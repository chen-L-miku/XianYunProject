<template>
  <div>
    <el-row v-for="(item,index) in data" :key="index">
      <h4>{{item.all_remarks}}条真实用户评论</h4>
        <!-- 评论 -->
      <el-row type="flex" justify="space-between" style="position: relative;">
        <div class="remarks">
          <p>总评数：{{item.all_remarks}}</p>
          <p>好评数：{{item.very_good_remarks}}</p>
          <p>差评数：{{item.very_bad_remarks}}</p>
        </div>

        <!-- 评分 -->
        <div>
          <el-rate
            v-model="value"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}"
            class="star"
          ></el-rate>
        </div>
        <div class="yiro">
          <p>环境:{{item.scores.environment}}分</p>
        </div>
        <div class="yiro">
          <p>产品:{{item.scores.product}}分</p>
        </div>
        <div class="yiro">
          <p>服务:{{item.scores.service}}分</p>
        </div>
        <div class="recommend">
          推荐
        </div>
      </el-row>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: 0
    };
  },
  props: {
    data: {
      type: Array,
      default: []
    }
  },
  mounted() {
    setTimeout(() => {
      this.data.forEach(res => {
        this.value = res.stars;
      });
    }, 2000);
  }
};
</script>
<style lang="less" scoped>
.remarks {
  margin: 30px 0;
  color: #666;
}
.yiro {
  color: #ff9900;
  line-height: 122px;
}
.star{
  padding: 53px 0;
}
.recommend{
  color:#ff9900;
  font-size: 20px;
  border: 3px solid #ff9900;
  transform: rotate(-30deg);
  width: 70px;
  height: 70px;
  text-align: center;
  line-height: 70px;
  border-radius: 50%;
  position: absolute;
  left: 250px;
  bottom: 25px;
  opacity: .3;
}
</style>
