<template>
  <view>
    <!--轮播图-->
    <swiper-image :resdata="banners" height="750" preview></swiper-image>
    <!--基础详情-->
    <base-info :detail="detail" :show-price="showPrice"></base-info>
    <!-- 滚动商品特性 w170*h110 -->
    <scroll-attrs :baseAttrs="baseAttrs"></scroll-attrs>
    <!-- 属性选择 -->
    <view class="p-2">
      <view class="rounded border bg-light-secondary">
        <uni-list-item @click="show('attr')">
          <!-- v-if="detail.sku_type === 1" -->
          <view class="d-flex">
            <text class="mr-2 text-muted">已选</text>
            <text>{{ checkedSkus }}</text>
          </view>
        </uni-list-item>
        <uni-list-item>
          <!-- @click="goToCoupon" -->
          <view class="d-flex">
            <text class="mr-2 text-muted">优惠券</text>
            <text class="main-text-color">马上领取</text>
          </view>
        </uni-list-item>
        <uni-list-item  @click="show('express')">
          <view class="d-flex">
            <text class="mr-2 text-muted">配送</text>
            <text class="mr-2">深圳市 南山区</text>
            <text class="main-text-color">现配</text>
          </view>
        </uni-list-item>
        <uni-list-item extraWidth="15%" @click="show('service')">
          <!-- uni-list-item extraWidth="15%" 组件右边宽度-->
          <view class="d-flex a-center">
            <view class="text-muted font d-flex a-center mr-2">
              <view class="iconfont icon-finish main-text-color"></view>
              哈哈自营
            </view>
            <view class="text-muted font d-flex a-center mr-2">
              <view class="iconfont icon-finish main-text-color"></view>
              哈哈发货
            </view>
            <view class="text-muted font d-flex a-center mr-2">
              <view class="iconfont icon-finish main-text-color"></view>
              七天无理由退货
            </view>
          </view>
        </uni-list-item>
      </view>
    </view>
    <!-- 横向滚动评论 
			外层 w620*h380
			头像 w70*h70
			图片 h115
		-->
    <scroll-comments :comments="comments"></scroll-comments>
    <!-- 商品详情 -->
    <!-- <view class="py-4">
			<u-parse className="uparse" :content="context" @preview="preview" @navigate="navigate" ></u-parse>
		</view> -->
    <!-- 热门推荐 -->
    <!-- 热门推荐 headTitleWeight标题加粗-->
    <card
      headTitle="热门推荐"
      :headTitleWeight="false"
      :headBorderBottom="false"
    >
      <view class="row j-sb">
        <common-list
          v-for="(item, index) in hotList"
          :key="index"
          :item="item"
          :index="index"
          type="redirectTo"
        >
        </common-list>
      </view>
    </card>
    <!-- 底部操作条 -->
    <bottom-btn @show="show('attr')"></bottom-btn>
    <!-- 属性筛选框 -->
    <common-popup :popupClass="popup.attr" @hide="hide('attr')">
      <view class="d-flex a-center" style="height: 275rpx">
        <image
          src="/static/images/demo/list/1.jpg"
          mode="widthFix"
          style="height: 180rpx; width: 180rpx"
          class="border rounded"
        ></image>
        <view class="pl-2">
          <price priceSize="font-lg" unitSize="font" :text="showPrice"></price>
          <text class="d-block">{{ checkedSkus }}</text>
        </view>
      </view>

      <scroll-view scroll-y class="w-100" style="height: 660rpx">
        <card
          :headTitle="item.title"
          :headTitleWeight="false"
          :headBorderBottom="false"
          :key="index"
          v-for="(item, index) in selects"
        >
          <zcm-radio-group
            :label="item"
            :selected.sync="item.selected"
          ></zcm-radio-group>
        </card>
        <view
          class="d-flex j-sb a-center p-2 border-top border-light-secondary"
        >
          <text>购买数量</text>
          <!-- -->
          <uni-number-box
            :min="1"
            :max="maxStock" 
            :value="detail.num"
            @change="detail.num = $event"
          ></uni-number-box>
        </view>
      </scroll-view>

      <view
        class="text-white font-md d-flex a-center j-center"
        style="height: 100rpx; margin-left: -30rpx; margin-right: -30rpx"
        :class="maxStock === 0 ? 'bg-secondary' : 'main-bg-color'"
        :hover-class="maxStock !== 0 ? 'main-bg-hover-color' : ''"
        @tap.stop="addCart"
      >
        {{ maxStock === 0 ? "暂无库存" : "加入购物车" }}
      </view>
    </common-popup>


    <!-- 收货地址 -->
    <common-popup :popupClass="popup.express" @hide="hide('express')">
      <view
        class="
          d-flex
          a-center
          j-center
          font-md
          border-bottom border-light-secondary
        "
        style="height: 100rpx"
      >
        收货地址
      </view>
      <scroll-view scroll-y class="w-100" style="height: 835rpx">
        <uni-list-item v-for="(item, index) in pathList" :key="index">
          <view class="iconfont icon-dingwei font-weight font-md">{{
            item.name
          }}</view>
          <view class="font text-light-muted">
            {{ item.path }} {{ item.detailPath }}
          </view>
        </uni-list-item>
      </scroll-view>

      <view
        class="main-bg-color text-white font-md d-flex a-center j-center"
        hover-class="main-bg-hover-color"
        style="height: 100rpx; margin-left: -30rpx; margin-right: -30rpx"
        @tap.stop="openCreatePath"
      >
        选择新的地址
      </view>
    </common-popup>

    <!-- 服务说明 -->
    <common-popup :popupClass="popup.service" @hide="hide('service')">
      <view
        class="
          d-flex
          a-center
          j-center
          font-md
          border-bottom border-light-secondary
        "
        style="height: 100rpx"
      >
        服务说明
      </view>
      <scroll-view scroll-y class="w-100" style="height: 835rpx">
        <view class="py-1">
          <view class="d-flex a-center">
            <view class="iconfont icon-finish main-text-color mr-1"></view>
          哈哈哈自营
          </view>
          <text class="text-light-muted font pl-4">
            不管满多少，就是不包邮
          </text>
        </view>
      </scroll-view>
      <view
        class="main-bg-color text-white font-md d-flex a-center j-center"
        hover-class="main-bg-hover-color"
        style="height: 100rpx; margin-left: -30rpx; margin-right: -30rpx"
        @tap.stop="hide('service')"
      >
        确定
      </view>
    </common-popup>
  </view>
</template>

<script>
import swiperImage from "@/components/index/swiper-image.vue";
import baseInfo from "@/components/detail/base-info.vue";
import scrollAttrs from "@/components/detail/scroll-attrs.vue";
import uniListItem from "@/components/uni-ui/uni-list-item/uni-list-item.vue";
import scrollComments from "@/components/detail/scroll-comments.vue";
import uParse from "@/components/uni-ui/uParse/src/wxParse.vue";
import card from "@/components/common/card.vue";
import commonList from "@/components/common/common-list.vue";
import bottomBtn from "@/components/detail/bottom-btn.vue";
import commonPopup from "@/components/common/common-popup.vue";
import price from "@/components/common/price.vue";
import zcmRadioGroup from "@/components/common/radio-group.vue";
import uniNumberBox from "@/components/uni-ui/uni-number-box/uni-number-box.vue";
import { mapState, mapMutations } from "vuex";
export default {
  components: {
    swiperImage,
    baseInfo,
    scrollAttrs,
    uniListItem,
    scrollComments,
    uParse,
    card,
    commonList,
    bottomBtn,
    commonPopup,
    price,
    zcmRadioGroup,
    uniNumberBox,
  },
  data() {
    return {
      pathList: [
        {name:"哈哈哈",path:"17347515092",detailPath:"深圳南山"},
        {name:"哈哈哈",path:"17347515092",detailPath:"深圳南山"},
        {name:"哈哈哈",path:"17347515092",detailPath:"深圳南山"}
      ],
      selects: [
        {
          title: "颜色",
          selected: 0,
          list: [{ name: "蓝" }, { name: "黄" }, { name: "红" }],
        },
        {
          title: "容量",
          selected: 0,
          list: [{ name: "64" }, { name: "128" }, { name: "选项三" }],
        },
        {
          title: "套餐",
          selected: 0,
          list: [{ name: "标配" }, { name: "套餐一" }, { name: "套餐二" }],
        },
      ],
      popup: {
        attr: "none",
        express: "none",
        service: "none",
      },
      checkedSkus: "火焰红",
      context: "",
      hotList: [
        {
          cover: "/static/images/demo/list/1.jpg",
          title: "卢文名",
          desc: "活的",
          oprice: 80,
          pprice: 1999,
        },
        {
          cover: "/static/images/demo/list/2.jpg",
          title: "熊文",
          desc: "活的",
          oprice: 80,
          pprice: 1999,
        },
        {
          cover: "/static/images/demo/list/3.jpg",
          title: "刘雅妮",
          desc: "活的",
          oprice: 80,
          pprice: 1999,
        },
        {
          cover: "/static/images/demo/list/4.jpg",
          title: "袁景一",
          desc: "活的",
          oprice: 80,
          pprice: 1999,
        },
      ],
      banners: [
        {
          src: "http://i8.mifile.cn/v1/a1/6d13e060-d5c5-e610-88d0-80816fa2b0ce.webp",
        },
        {
          src: "http://i8.mifile.cn/v1/a1/aff0b715-e63a-68f3-91b0-46a22543555e.webp",
        },
      ],
      baseAttrs: [
        {
          icon: "icon-cpu",
          title: "CPU",
          desc: "845八核",
        },
        {
          icon: "icon-cpu",
          title: "CPU",
          desc: "845八核",
        },
        {
          icon: "icon-cpu",
          title: "CPU",
          desc: "845八核",
        },
        {
          icon: "icon-cpu",
          title: "CPU",
          desc: "845八核",
        },
        {
          icon: "icon-cpu",
          title: "CPU",
          desc: "845八核",
        },
        {
          icon: "icon-cpu",
          title: "CPU",
          desc: "845八核",
        },
        {
          icon: "icon-cpu",
          title: "CPU",
          desc: "845八核",
        },
        {
          icon: "icon-cpu",
          title: "CPU",
          desc: "845八核",
        },
      ],
      detail: {
        // id: 20,
        title: "小米MIX3 6GB+128GB",
        desc: "磁动力滑盖全面屏 / 前后旗舰AI双摄 / 四曲面彩色陶瓷机身 / 高效10W无线充电",
        // cover: "/static/images/demo/list/1.jpg",
        pprice: 3299,
        num: 1,
        max: 100,
      },
      comments: [
        {
          userpic: "/static/images/demo/demo6.jpg",
          username: "哈哈哈",
          create_time: "2022-04-15",
          good_num: "123",
          context: "评论内容",
          imglist: [
            "/static/images/demo/demo6.jpg",
            "/static/images/demo/demo6.jpg",
            "/static/images/demo/demo6.jpg",
          ],
        },
      ],
    };
  },
  // 监听页面返回事件
  onBackPress() {
    // 关闭模态框
    for (let key in this.popup) {
      if (this.popup[key] !== "none") {
        this.hide(key);
        return true;
      }
    }
  },
  computed: {
    // ...mapState({
    //   pathList: (state) => state.path.list,
    // }),
    // 选中skus的索引
    checkedSkusIndex() {
      if (!Array.isArray(this.detail.goodsSkus)) {
        return -1;
      }
      let index = this.detail.goodsSkus.findIndex((item) => {
        return item.skusText === this.checkedSkus;
      });
      return index;
    },
    // 显示价格
    showPrice() {
      if (this.checkedSkusIndex < 0) {
        return this.detail.min_price || 0.0;
      }
      return this.detail.goodsSkus[this.checkedSkusIndex].pprice;
    },
    maxStock() {
      if (this.detail.sku_type === 0) {
        return this.detail.stock;
      }
      if (!Array.isArray(this.detail.goodsSkus)) {
        return 100;
      }
      return this.detail.goodsSkus[this.checkedSkusIndex].stock;
    },
  },
  // onLoad(e) {
  // 		if (e.detail) {
  // 			this.__init(JSON.parse(e.detail))
  // 		}
  // 	},
  methods: {
    openCreatePath() {
      uni.navigateTo({
        url: "../user-path-edit/user-path-edit",
      });
      this.hide("express");
    },
    hide(key) {
      this.popup[key] = "hide";
      setTimeout(() => {
        this.popup[key] = "none";
      }, 200);
    },
    show(key) {
      this.popup[key] = "show";
    },
    preview(src, e) {
      // do something
      console.log("src: " + src);
    },
    navigate(href, e) {
      // 如允许点击超链接跳转，则应该打开一个新页面，并传入href，由新页面内嵌webview组件负责显示该链接内容
      console.log("href: " + href);
      uni.wx.showModal({
        content: "content" + href,
        showCancel: false,
      });
    },
    // 进入领取优惠券页面
    goToCoupon() {
      this.navigateTo({
        url: "../coupon/coupon",
      });
    },
  },
};
</script>

<style>
.uparse .p {
  padding: 0 !important;
}
.uparse view,
.uparse uni-view {
  line-height: 0 !important;
}
</style>
