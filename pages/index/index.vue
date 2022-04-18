<template>
	<view>
		<!-- 自定义导航 -->
		<view class="d-flex a-center" style="height: 90rpx;">
			<!-- 左边 -->
			<view style="width: 85rpx;" class="d-flex a-center j-center">
				<text class="iconfont icon-xiaoxi"><uni-icons type="chat-filled" size="30"></uni-icons></text>
			</view>
			<!-- 中间 -->
			<view class="flex-1 bg-light rounded d-flex a-center text-light-muted" style="height: 65rpx;" @click="openSearch">
				<text class="iconfont icon-sousuo mx-2"></text>
				智能积木
			</view>
			<!-- 右边 -->
			<view style="width: 85rpx;" class="d-flex a-center j-center">
				<text class="iconfont icon-richscan_icon"><uni-icons type="scan" size="30"></uni-icons></text>
			</view>
		</view>
		<!-- 顶部选项卡 -->
		<scroll-view scroll-x class="border-bottom scroll-row" style="height: 80rpx;" :scroll-into-view="scrollinto" :scroll-with-animation="true" :show-scrollbar="false">
			<view
				class="scroll-row-item px-3"
				@click="changeTab(index)"
				style="height: 80rpx;line-height: 80rpx;"
				v-for="(item, index) in tabBars"
				:key="index"
				:id="'tab' + index"
			>
				<text class="font-md" :class="tabIndex === index ? 'main-text-color' : ''">{{ item.name }}</text>
			</view>
		</scroll-view>

		<!--滑块-->
		<swiper :duration="150" :current="tabIndex" :style="'height:' + scrollH + 'px;'" @change="onChangeTab">
			<swiper-item v-for="(item, index) in newsitems" :key="index" style="display: flex;">
				<scroll-view scroll-y="true" :style="'height:' + scrollH + 'px;'" @scrolltolower="loadmore(index)" :show-scrollbar="false">
					<template v-if="item.list.length > 0">
						<!-- <template v-if="item.list.length > 0"></template> -->
						<block v-for="(list, listIndex) in item.list" :key="listIndex">
							<!-- 轮播图组件 -->
							<swiper-image v-if="list.type === 'swipers'" :resdata="list.data" />
							<!--首页分类-->
							<template v-else-if="list.type === 'indexnavs'">
								<index-nav :resdata="list.data" />
								<!--分割线-->
								<!-- <divider /> -->
							</template>
							<!--三图-->
							<!-- <swiper-image v-if="list.type === 'swipers'" :resdata="list.data" /> -->
							<!-- <template v-else-if="list.type === 'threeAdv'"> -->
							<!-- <three-adv :resdata="list.data" /> -->
							<!-- <three-adv :resdata="threeAdv"/> -->
							<!-- <divider /> -->
							<!--分割线-->
							<!-- </template> -->

							<!--大图广告-->
							<template v-else-if="list.type === 'titleList'">
								<card :resdata="list.data"></card>
							</template>
							<!-- <card headTitle="hhhhh " bodyCover="/static/images/demo/demo4.jpg"></card> -->
							<!-- 公共列表-->
							<view class="row j-sb" v-else-if="list.type === 'commonList'">
								<block v-for="(item2, index2) in list.data" :key="index2"><common-list :item="item2" :index="index2"></common-list></block>
							</view>
						</block>
						<!-- 上拉加载更多 -->
						<divider />
						<view class="d-flex a-center j-center text-light-muted font-md py-3">{{ item.loadtext }}</view>
					</template>
					<template v-else-if="item.firstLoad === 'before' || item.firstLoad === 'ing'">
						<view class="d-flex j-center a-center pt-5"><text class="font-md text-light-muted">加载中...</text></view>
					</template>
					<template v-else>
						<!-- 空数据 -->
						<view class="d-flex j-center a-center pt-5"><text class="font-md text-light-muted">暂无数据</text></view>
					</template>
				</scroll-view>
			</swiper-item>
		</swiper>

		<!-- <view style="padding-bottom: 90upx;"></view> -->
	</view>
</template>

<script>
import swiperImage from '@/components/index/swiper-image.vue';
import indexNav from '@/components/index/index-nav.vue';
import card from '@/components/common/card.vue';
import commonList from '@/components/common/common-list.vue';
import threeAdv from '@/components/index/three-adv.vue';
export default {
	components: {
		swiperImage,
		indexNav,
		card,
		commonList,
		threeAdv
	},
	data() {
		return {
			scrollinto: '',
			scrollH: 500,
			tabIndex: 0,
			tabBars: [
				{
					name: '关注'
				},
				{
					name: '推荐'
				},
				{
					name: '体育'
				},
				{
					name: '热点'
				},
				{
					name: '财经'
				},
				{
					name: '娱乐'
				},
				{
					name: '军事'
				},
				{
					name: '历史'
				}
			],
			newsitems: [
				{
					name: '关注',
					list: [
						{
							type: 'swipers',
							data: [{ src: '../../static/tu/5.png' }, { src: '../../static/tu/6.png' }, { src: '../../static/tu/7.png' }]
						},
						{
							type: 'indexnavs',
							data: [
								{ src: '/static/images/indexnav/1.png', text: '盛世阑珊' },
								{ src: '/static/images/indexnav/2.gif', text: '韶华易逝' },
								{ src: '/static/images/indexnav/3.gif', text: '四月年华' },
								{ src: '/static/images/indexnav/4.gif', text: '倾城时光' },
								{ src: '/static/images/indexnav/5.gif', text: '苏莫锦秋' },
								{ src: '/static/images/indexnav/6.gif', text: '青葱以南' },
								{ src: '/static/images/indexnav/7.gif', text: '瑾年安好' },
								{ src: '/static/images/indexnav/8.gif', text: '李念佳人' },
								{ src: '/static/images/indexnav/9.gif', text: '良辰景好' },
								{ src: '/static/images/indexnav/10.gif', text: '薄情七七' }
							]
						},
						{
							type: 'titleList',
							data: [{ text: 'hhhh', src: '/static/images/demo/demo4.jpg' }]
						},
						{
							type: 'commonList',
							data: [
								{
									cover: '/static/images/demo/list/1.jpg',
									title: '卢文名',
									desc: '活的',
									oprice: 80,
									pprice: 1999
								},
								{
									cover: '/static/images/demo/list/2.jpg',
									title: '熊文',
									desc: '活的',
									oprice: 80,
									pprice: 1999
								},
								{
									cover: '/static/images/demo/list/3.jpg',
									title: '刘雅妮',
									desc: '活的',
									oprice: 80,
									pprice: 1999
								},
								{
									cover: '/static/images/demo/list/4.jpg',
									title: '袁景一',
									desc: '活的',
									oprice: 80,
									pprice: 1999
								}
							]
						},
						{
							type: 'threeAdv',
							data: {
								big: {
									src: '/static/images/demo/demo1.jpg'
								},
								smalltop: {
									src: '/static/images/demo/demo2.jpg'
								},
								smallbottom: {
									src: '/static/images/demo/demo3.jpg'
								}
							}
						}
					]
				},
				{
					name: '推荐',
					list: [
						{
							type: 'indexnavs',
							data: [
								{ src: '/static/images/indexnav/1.png', text: '盛世阑珊' },
								{ src: '/static/images/indexnav/2.gif', text: '韶华易逝' },
								{ src: '/static/images/indexnav/3.gif', text: '四月年华' },
								{ src: '/static/images/indexnav/4.gif', text: '倾城时光' },
								{ src: '/static/images/indexnav/5.gif', text: '苏莫锦秋' },
								{ src: '/static/images/indexnav/6.gif', text: '青葱以南' },
								{ src: '/static/images/indexnav/7.gif', text: '瑾年安好' },
								{ src: '/static/images/indexnav/8.gif', text: '李念佳人' },
								{ src: '/static/images/indexnav/9.gif', text: '良辰景好' },
								{ src: '/static/images/indexnav/10.gif', text: '薄情七七' }
							]
						},
					]
				},
				{
					name: '体育',
					list: []
				},
				{
					name: '热点',
					list: []
				},
				{
					name: '财经',
					list: []
				},
				{
					name: '娱乐',
					list: []
				},
				{
					name: '军事',
					list: []
				},
				{
					name: '历史',
					list: []
				}
			] //
		};
	},

	onLoad() {
		//获取可视区域高度
		uni.getSystemInfo({
			success: res => {
				this.scrollH = res.windowHeight - uni.upx2px(82);
			}
		});
	},
	methods: {
		openSearch() {
			uni.navigateTo({
				url: '../search/search'
			});
		},
		//切换选项卡
		changeTab(index) {
			if (this.tabIndex === index) {
				return;
			}
			this.tabIndex === index;
			this.scrollinto = 'tab' + index;
			// if (this.newsitems[index].firstLoad === 'after') {
			// 	return;
			// }
			// this.addData();
		},
		// 监听滑动列表
		onChangeTab(e) {
			this.changeTab(e.detail.current);
		},
		// 上拉加载更多
		loadmore(index) {
			let item = this.newsitems[index];
			// 是否处于可加载状态
			if (item.loadtext !== '上拉加载更多') return;
			// 模拟加载
			item.loadtext = '加载中...';

			this.addData(() => {
				uni.showToast({
					title: '加载成功'
				});
			});
		}
	}
};
</script>

<style>
.swiper-item {
	width: 750upx;
	height: 400upx;
}
</style>
