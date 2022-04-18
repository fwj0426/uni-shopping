<template>
  <view>
    <!--轮播图-->
    <swiper-image :resdata="banners" height="750" preview></swiper-image>
    <!--基础详情-->
    <base-info :detail="detail" :show-price="showPrice"></base-info>
    <!-- 滚动商品特性 w170*h110 -->
    <scroll-attrs :baseAttrs="baseAttrs"></scroll-attrs>
    <!-- 属性选择 -->
    <!-- 横向滚动评论 
			外层 w620*h380
			头像 w70*h70
			图片 h115
		-->
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
// import uniListItem from "@/components/uni-ui/uni-list-item/uni-list-item.vue";
// import scrollComments from "@/components/detail/scroll-comments.vue";
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
      baseAttrs:[],
      detail: {
        // id: 20,
        title: "小米MIX3 6GB+128GB",
        desc: "磁动力滑盖全面屏 / 前后旗舰AI双摄 / 四曲面彩色陶瓷机身 / 高效10W无线充电",
        // cover: "/static/images/demo/list/1.jpg",
        pprice: 3299,
        // num: 1,
        // max: 100,
      },
    };
  },
  computed: {
    // 选中skus的索引
			checkedSkusIndex(){
				if (!Array.isArray(this.detail.goodsSkus)) {
					return -1
				}
				let index = this.detail.goodsSkus.findIndex((item)=>{
					return item.skusText === this.checkedSkus
				})
				return index
			},
			// 显示价格
			showPrice(){
				if (this.checkedSkusIndex < 0) {
					return this.detail.min_price || 0.00
				}
				return this.detail.goodsSkus[this.checkedSkusIndex].pprice
			},
  },
  methods: {},
};
</script>

<style>
</style>
