<template>
  <div class="detailMap">
    <el-row type="flex" justify="space-between">
      <!-- 地图本体 -->
      <div id="container"></div>
      <!-- tab栏切换 -->
      <div class="mapRight">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="风景" name="first">
            <div class="infinite-list-wrapper" style="overflow:scroll; height:300px;" >
              <ul class="list" v-infinite-scroll="load" infinite-scroll-disabled="disabled">
                <li v-for="i in count" :key="i" class="list-item">{{ i }}</li>
              </ul>
              <p v-if="loading">加载中...</p>
              <p v-if="noMore">没有更多了</p>
            </div>
          </el-tab-pane>
          
          <el-tab-pane label="交通" name="second">
            <div class="infinite-list-wrapper" style="overflow:scroll; height:300px;" >
              <ul class="list" v-infinite-scroll="load" infinite-scroll-disabled="disabled">
                <li v-for="i in count" :key="i" class="list-item">{{ i }}</li>
              </ul>
              <p v-if="loading">加载中...</p>
              <p v-if="noMore">没有更多了</p>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: "first",
      longitude: "118.8718107", // 经度
      latitude: "31.32846821", //纬度
      count: 10,
      loading: false
    };
  },
  computed: {
    noMore() {
      return this.count >= 20;
    },
    disabled() {
      return this.loading || this.noMore;
    }
  },
  methods: {
    // tab栏
    handleClick(tab, event) {
      console.log(tab, event);
    },
    // 无限滚动(伪)
    load() {
      this.loading = true;
      setTimeout(() => {
        this.count += 2;
        this.loading = false;
      }, 2000);
    },
    // 获取地图
    getMap() {
      var latitude = this.latitude;
      var longitude = this.longitude;
      console.log(this.longitude);

      window.onLoad = function() {
        console.log(444444);
        console.log(latitude);
        console.log(longitude);
        var map = new AMap.Map("container", {
          zoom: 11, //级别
          center: [longitude, latitude], //中心点坐标
          viewMode: "3D" //使用3D视图
        });
        // 创建一个 Marker 实例：
        var marker = new AMap.Marker({
          position: new AMap.LngLat(longitude, latitude), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
          title: "北京"
        });

        // 将创建的点标记添加到已有的地图实例：
        map.add(marker);
      };

      var url =
        "https://webapi.amap.com/maps?v=1.4.15&key=c36fbe95286de31c6c67d45448133c84&callback=onLoad";
      var jsapi = document.createElement("script");
      jsapi.charset = "utf-8";
      jsapi.src = url;
      document.head.appendChild(jsapi);
    }
  },
  props: {
    data: {
      type: Array,
      default: []
    }
  },

  mounted() {
    setTimeout(() => {
      console.log(this.data);
      this.data.forEach(res => {
        this.longitude = res.location.longitude;
        this.latitude = res.location.latitude;
        this.getMap();
      });
    }, 1000);

    this.getMap();
  }
};
</script>

<style lang="less" scoped>
.detailMap{
  margin-bottom: 50px;
}
#container {
  width: 650px;
  height: 360px;
}
.mapRight {
  width: 330px;
  height: 360px;
}
</style>
