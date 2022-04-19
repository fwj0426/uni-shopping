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
        <uni-list-item>
          <!-- @click="show('attr')" v-if="detail.sku_type === 1" -->
          <view class="d-flex">
            <text class="mr-2 text-muted">已选</text>
            <text>{{ checkedSkus }}</text>
          </view>
        </uni-list-item>
        <uni-list-item >
          <!-- @click="goToCoupon" -->
					<view class="d-flex">
						<text class="mr-2 text-muted">优惠券</text>
						<text class="main-text-color">马上领取</text>
					</view>
				</uni-list-item>
        <uni-list-item>
          <view class="d-flex">
            <text class="mr-2 text-muted">配送</text>
            <text class="mr-2">深圳市 南山区</text>
            <text class="main-text-color">现配</text>
          </view>
        </uni-list-item>
        <uni-list-item extraWidth="15%">   
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
    <!-- 热门推荐 -->
    <!-- 底部操作条 -->
    <!-- 属性筛选框 -->
    <!-- 
			商品信息(275rpx)
			图片 180*180
			-->
    <!-- 
			表单部分(660rpx)
			-->
    <!-- 
			 按钮(100rpx)
			 -->
    <!-- 收货地址 -->
  </view>
</template>

<script>
import swiperImage from "@/components/index/swiper-image.vue";
import baseInfo from "@/components/detail/base-info.vue";
import scrollAttrs from "@/components/detail/scroll-attrs.vue";
import uniListItem from "@/components/uni-ui/uni-list-item/uni-list-item.vue";
import scrollComments from "@/components/detail/scroll-comments.vue";
// import uParse from "@/components/uni-ui/uParse/src/wxParse.vue";
// import card from "@/components/common/card.vue";
// import commonList from "@/components/common/common-list.vue";
// import bottomBtn from "@/components/detail/bottom-btn.vue";
// import commonPopup from "@/components/common/common-popup.vue";
// import price from "@/components/common/price.vue";
// import zcmRadioGroup from "@/components/common/radio-group.vue";
// import uniNumberBox from "@/components/uni-ui/uni-number-box/uni-number-box.vue";
// import { mapState, mapMutations } from "vuex";
export default {
  components: {
    swiperImage,
    baseInfo,
    scrollAttrs,
    uniListItem,
    scrollComments,
  },
  data() {
    return {
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
        // num: 1,
        // max: 100,
      },
      comments:[
        {
          userpic:"/static/images/demo/demo6.jpg",
          username:"哈哈哈",
          create_time:"2022-04-15",
          good_num:"123",
          context:"评论内容",
          imglist:[
            "/static/images/demo/demo6.jpg",
            "/static/images/demo/demo6.jpg",
            "/static/images/demo/demo6.jpg",
          ]
        }
      ],
    };
  },
  computed: {
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
  },
  methods: {},
};
</script>

<style>
</style>
