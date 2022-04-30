<template>
  <view style="height: 100vh" class="d-flex flex-column">
    <!-- 自定义导航 -->
    <!-- <view class="d-flex a-center" style="height: 90rpx;"> -->
    <!-- 左边 -->
    <!-- <view style="width: 25rpx;" class="d-flex a-center j-center"><text class="iconfont icon-xiaoxi"></text></view> -->
    <!-- 中间 -->
    <!-- <view class="flex-1 bg-light rounded d-flex a-center text-light-muted" style="height: 65rpx;" @click="openSearch">
				<text class="iconfont icon-sousuo mx-2"><uni-icons type="search" size="15"></uni-icons></text>
				智能积木
			</view> -->
    <!-- 右边 -->
    <!-- <view style="width: 85rpx;" class="d-flex a-center j-center">
				<text class="iconfont icon-richscan_icon"><uni-icons type="chat-filled" size="30"></uni-icons></text>
			</view>
		</view> -->
    <view
      class="d-flex border-top border-light-secondary animated fadeIn faster"
      style="height: 100%; box-sizing: border-box"
    >
      <loading :show="showLoading"></loading>

      <scroll-view
        id="leftScroll"
        scroll-y
        style="flex: 1; height: 100%"
        class="border-right border-light-secondary"
        :scroll-top="leftScrollTop"
      >
        <view
          class="border-bottom border-light-secondary py-1 left-scroll-item"
          hover-class="bg-light-secondary"
          v-for="(item, index) in cate"
          :key="index"
          @tap="changCate(index)"
        >
          <view
            class="py-1 font-md text-muted text-center"
            :class="activeIndex === index ? 'class-active' : ''"
            >{{ item.name }}</view
          >
        </view>
      </scroll-view>
      <!-- 
				:scroll-with-animation="true"    开启动画
				@scroll="onRightScroll" 监听右边的滚动事件
			-->
      <scroll-view
        scroll-y
        style="flex: 3.5; height: 100%"
        :scroll-top="rightScrollTop"
        :scroll-with-animation="true"
        @scroll="onRightScroll"
      >
        <view
          class="row right-scroll-item"
          v-for="(item, index) in list"
          :key="index"
        >
          <view
            class="span24-8 text-center py-2"
            v-for="(item2, index2) in item.list"
            :key="index2"
            @click="openDetail(item2)"
          >
            <image
              :src="item2.src"
              style="width: 120upx; height: 120upx"
            ></image>
            <text class="d-block">{{ item2.name }}</text>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
import loading from "@/common/mixin/loading.js";

export default {
  data() {
    return {
      showLoading: true,
      leftDomsTop: [],
      //左边顶部距离
      rightDomsTop: [],
      //右边顶部距离
      //https://uniapp.dcloud.io/api/ui/nodes-info.html#createselectorquery
      rightScrollTop: 0,
      //右边高度
      leftScrollTop: 0,
      //左边高度
      cateItemHeight: 0,
      //记录高度
      // 当前选中的分类
      activeIndex: 0,
      cate: [],
      list: [],
    };
  },
  //监听滚动屏幕
  watch: {
    async activeIndex(newValue, oldValue) {
      // 获取scroll-view高度，scrollTop
      const query = uni.createSelectorQuery().in(this);
      query
        .select("#leftScroll")
        .fields(
          {
            size: true,
            scrollOffset: true,
          },
          (data) => {
            let H = data.height;
            let ST = data.scrollTop;
            // 下边
            if (this.leftDomsTop[newValue] + this.cateItemHeight > H + ST) {
              return (this.leftScrollTop =
                this.leftDomsTop[newValue] + this.cateItemHeight - H);
            }
            // 上边
            if (ST > this.cateItemHeight) {
              this.leftScrollTop = this.leftDomsTop[newValue];
            }
          }
        )
        .exec();
      // let data = await this.getElInfo({
      // 	size: true,
      // 	scrollOffset: true
      // });
      // let H = data.height;
      // let ST = data.scrollTop;
      // // 下边
      // if (this.leftDomsTop[newValue] + this.cateItemHeight > H + ST) {
      // 	return (this.leftScrollTop = this.leftDomsTop[newValue] + this.cateItemHeight - H);
      // }
      // // 上边
      // if (ST > this.cateItemHeight) {
      // 	this.leftScrollTop = this.leftDomsTop[newValue];
      // }
    },
  },
  onLoad() {
    this.getData(); //获取数据
  },
  onReady() {
    const query = uni.createSelectorQuery().in(this);
    query
      .selectAll(".left-scroll-item")
      .fields(
        {
          size: true,
          rect: true,
        },
        (data) => {
          this.leftDomsTop = data.map((v) => {
            this.cateItemHeight = v.height;
            return v.top;
          });
        }
      )
      .exec();

    query
      .selectAll(".right-scroll-item")
      .fields(
        {
          size: false,
          rect: true,
        },
        (data) => {
          this.rightDomsTop = data.map((v) => v.top);
        }
      )
      .exec();
  },
  methods: {
    // 获取节点信息
    getElInfo(obj = {}) {
      return new Promise((res, rej) => {
        let option = {
          size: obj.size ? true : false,
          rect: obj.rect ? true : false,
          scrollOffset: obj.scrollOffset ? true : false,
        };
        const query = uni.createSelectorQuery().in(this);
        let q = obj.all
          ? query.selectAll(`.${obj.all}-scroll-item`)
          : query.select("#leftScroll");
        q.fields(option, (data) => {
          res(data);
        }).exec();
      });
    },
    getData() {
      for (let i = 0; i < 20; i++) {
        this.cate.push({
          name: "分类" + i,
        });
        this.list.push({
          list: [],
        });
      }
      for (let i = 0; i < this.list.length; i++) {
        for (let j = 0; j < 24; j++) {
          this.list[i].list.push({
            src: "../../static/images/demo/cate_01.png",
            name: `分类${i}-商品${j}`,
          });
        }
      }
      this.$nextTick(() => {
        this.showLoading = false;
      });
    },
    openSearch() {
      uni.navigateTo({
        url: "../search/search",
      });
    },

    // 点击左边分类
    changCate(index) {
      this.activeIndex = index;
      // 右边scroll-view滚动到对应区块
      this.rightScrollTop = this.rightDomsTop[index];
    },
    // 监听右边滚动事件
    async onRightScroll(e) {
      // 匹配当前scrollTop所处的索引
      this.rightDomsTop.forEach((v, k) => {
        if (v < e.detail.scrollTop + 3) {
          //如果当前值小于滚动的位置,
          this.activeIndex = k;
          return false;
        }
      });
    },
    // 打开详情页
    openDetail(item) {
      /*
						{
							"id":1,
							"name":"新品",
							"cover":"https://res.vmallres.com/pimages/product/6901443331376/428_428_FAF5BBAB67C16D7426B5B1A2A38F9001DED6D011A0EE9977mp.png",
							"category_id":1,
							"goods_id":25,
							"order":50,
							"create_time":"2019-08-17 00:57:12",
							"update_time":"2019-08-17 00:57:12"
						}
						*/
      uni.navigateTo({
        url:
          "../detail/detail?detail=" +
          JSON.stringify({
            id: item.goods_id,
            title: item.name,
          }),
      });
    },
  },
};
</script>

<style>
.class-active {
  border-left: 8upx solid #fd6801;
  color: #fd6801 !important;
}
</style>
