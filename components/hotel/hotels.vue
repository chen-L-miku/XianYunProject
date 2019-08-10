<template>
  <div class="hotels">
    <el-row justify="space-around">
      <el-input placeholder="请输入地方" style="width:25%" v-model="val" @change="getInput"></el-input>
      <el-date-picker
        v-model="value"
        type="daterange"
        range-separator="-"
        start-placeholder="入住日期"
        end-placeholder="离店日期"
        style="width:35%"
        @change="getUserDate"
        format="yyyy 年 MM 月 dd 日"
        value-format="yyyy-MM-dd"
      ></el-date-picker>
      <el-popover placement="bottom" width="400" v-model="visible">
        <div class="clearfix slect">
          <span style="float: left;line-height:30px;">每间</span>
          <div style="float:left;margin-left:160px">
            <el-dropdown size="mini" split-button trigger="click">
              {{str}}成人
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  v-for="(item,index) in nums"
                  :key="index"
                  @click.native="getnum(item)"
                >{{item}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div style="float:right;">
            <el-dropdown size="mini" split-button trigger="click">
              {{strs}}儿童
              <el-dropdown-menu slot="dropdown">
                <!-- 遍历生成结构,给点击事件加native可触发事件,可获取值 -->
                <el-dropdown-item
                  v-for="(item,index) in num"
                  :key="index"
                  @click.native="setnum(item)"
                >{{item}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
        <div style="text-align: right; margin-top:20px">
          <el-button size="mini" type="text" @click="visible = false">取消</el-button>
          <el-button type="primary" size="mini" @click.native="getInputs">确定</el-button>
        </div>
        <el-input slot="reference" placeholder="请点击再选择" style="width:20%" v-model="arr">
          <i class="el-input__icon iconfont iconuser" slot="suffix"></i>
        </el-input>
      </el-popover>
      <el-button type="primary" style="width:12%">查看价格</el-button>
    </el-row>
    <el-row style="margin-top:30px;">
      <el-col :span="12">
        <div class="leftNav">
          <div
            class="adress"
            style="height:65px;overflow: hidden; 
      text-overflow: ellipsis;"
            ref="font"
          >
            <el-col :span="4">区域:</el-col>
            <el-col :span="20">
              <span class="span">
                <button @click="setFont" style="color:black;border:1px solid #ededed">全部</button>
                <nuxt-link to="#" v-for="(item,index) in address" :key="index">
                  <span>{{item}}</span>
                </nuxt-link>
                <button @click="getFont" style="color:black;border:1px solid #ededed">收回</button>
              </span>
            </el-col>
          </div>
          <div class="let" style="height:100px;margin:27px 0">
            <el-col :span="4">攻略:</el-col>
            <el-col :span="20">
              北京，你想要的都能在这找到。博古通今，兼容并蓄，天下一城，如是帝都。
              景点以故宫为中心向四处辐射；地铁便宜通畅，而且覆盖绝大多数景点。
              由于早上有天安门升旗仪式，所以大多数人选择在天安门附近住宿。
            </el-col>
          </div>
          <div class="bottom">
            <el-col :span="4">厂价:</el-col>
            <el-col :span="6">
              <span style="color:#f90">
                <i class="iconfont iconhuangguan"></i>
                <i class="iconfont iconhuangguan"></i>
                <i class="iconfont iconhuangguan"></i>
              </span>
              <em>￥332</em>
            </el-col>
            <el-col :span="6">
              <span style="color:#f90">
                <i class="iconfont iconhuangguan"></i>
                <i class="iconfont iconhuangguan"></i>
                <i class="iconfont iconhuangguan"></i>
              </span>
              <em>￥521</em>
            </el-col>
            <el-col :span="8">
              <span style="color:#f90">
                <i class="iconfont iconhuangguan"></i>
                <i class="iconfont iconhuangguan"></i>
                <i class="iconfont iconhuangguan"></i>
                <i class="iconfont iconhuangguan"></i>
              </span>
              <em>￥768</em>
            </el-col>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div id="container"></div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
      val: "南京",
      value: "",
      address: {},
      num: [1, 2, 3, 4, 5],
      nums: [1, 2, 3, 4, 5, 6],
      str: 0,
      strs: 0,
      arr: "",
      visible: false
    };
  },
  methods: {
    getInputs() {
      if ((this.str && this.strs) || this.str || this.strs) {
        this.arr = this.str + "成人" + this.strs + "儿童";
        this.visible = false;
        // console.log(this.arr);
      } else {
        this.visible = false;
      }
    },
    getnum(item) {
      this.str = item;
      // console.log(item);
    },
    setnum(item) {
      this.strs = item;
    },
    setFont() {
      this.$refs.font.style.height = "222px";
    },
    getFont() {
      this.$refs.font.style.height = "65px";
    },
    // 传值给父组件
    getInput(val) {
      this.val = val;
      let add = this.val;
      this.$emit("getAddress", add);
    },
    // 选择时间列表时
    getUserDate(value) {
      // console.log("时间", value);
    }
  },
  mounted() {
    this.$axios({
      url: "/cities",
      params: {
        name: "南京"
      }
    }).then(res => {
      let { scenics } = res.data.data[0];
      let name = [];
      scenics.forEach(function(item, index) {
        name.push(item.name);
      });
      // console.log("酒店",name );
      this.address = name;
    }),
      (window.onLoad = function() {
        var map = new AMap.Map("container", {
          zoom: 11, //级别
          center: [118.8718107, 31.32846821], //中心点坐标
          viewMode: "3D" //使用3D视图
        });

        // 创建一个 Marker 实例：
        var marker = new AMap.Marker({
          position: new AMap.LngLat(118.8718107, 31.32846821), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
          title: "北京"
        });

        // 将创建的点标记添加到已有的地图实例：
        map.add(marker);
      });

    var url =
      "https://webapi.amap.com/maps?v=1.4.15&key=dbd5d8fc043f5460acb93c3989659975&callback=onLoad";
    var jsapi = document.createElement("script");
    jsapi.charset = "utf-8";
    jsapi.src = url;
    document.head.appendChild(jsapi);
  }
};
</script>
<style lang="less" scoped>
.hotels {
  margin: 30px 0;
  .leftNav {
    border: 1px solid #fff;
    width: 90%;
    height: 300px;
    a {
      padding-left: 10px;
      &:hover,
      &:focus,
      &:active {
        border-bottom: 1px #409eff solid;
        color: #409eff;
      }
    }
    .let {
      height: 100px;
    }
  }
  #container {
    width: 100%;
    height: 400px;
  }
}
.slect {
  border-bottom: 1px solid #ededed;
  padding: 5px 0 20px 0;
}
/*清除浮动*/
.clearfix::after {
  visibility: hidden;
  clear: both;
  display: block;
  content: ".";
  height: 0;
}
</style>
