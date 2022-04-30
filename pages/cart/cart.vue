<template>
	<view class="animated fadeIn faster" style="background: #f5f5f5">
		<!--  v-if="beforeReady" -->
		<loading-plus></loading-plus>
		<!-- @click-right="isedit = !isedit"  取反状态 假如是TRUE 则显示FALSE   :fixed="true"固定导航条 -->
		<uni-nav-bar :right-text="isedit ? '完成' : '编辑'" title="购物车" statusBar :shadow="false" @click-right="isedit = !isedit" :fixed="true"></uni-nav-bar>
		<!-- 购物车为空 -->
		<view class="py-5 d-flex a-center j-center bg-white">
			<view class="iconfont icon-gouwuche text-light-muted" style="font-size: 50upx;"></view>
			<text class="text-light-muted mx-2">购物车还是为空</text>
			<view class="px-2 py-1 border border-light-secondary rounded" hover-class="bg-light-secondary">去逛逛</view>
		</view>

		<!-- 购物车商品列表 -->
		<view class="bg-white px-2">
			<!-- 列表 -->
			<view class="d-flex a-center py-3 border-bottom border-light-secondary" v-for="(item, index) in list" :key="index">
				<label class="radio d-flex a-center j-center flex-shrink" style="width: 80upx;height: 80upx;" @click="selectItem(index)">
					<radio :value="item.id" :checked="item.checked" color="#FD6801" />
				</label>

				<image :src="item.cover" mode="widthFix" style="height: 150rpx;width: 150rpx;" class="border border-light-secondary rounded p-2 flex-shrink"></image>

				<view class="flex-1 d-flex flex-column pl-2">
					<view class="text-dark" style="font-size: 35upx;">{{ item.title }}</view>
					<!-- 规格属性  :class="isedit ? ' p-1 bg-light-secondary mb-2' : ''"
					 @tap.stop="showPopup(index, item)" v-if="item.skus_type === 1"-->
					<view class="d-flex text-light-muted mb-1" >
						<text class="mr-1" v-for="(attr,attrIndex) in item.skusText" 
						:key="attrIndex">{{attr.list[attr.selected].name}} </text>
						<!-- {{ item.skusText }} -->
						<view class="iconfont icon-bottom font ml-auto" v-if="isedit"></view>
					</view>
					<view class="mt-auto d-flex j-sb">
						<price :text="item.pprice"></price>
						<view class="a-self-end">
							<uni-number-box :min="item.minnum" :value="item.num" :max="item.maxnum"
							 @change="changeNum($event, item, index)"></uni-number-box>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="text-center main-text-color font-md font-weight mt-5">
			 为你推荐
		 </view>
		 <view class="position-relative d-flex a-center j-center text-secondary mb-3 pt-3">
			<view style="background: #F5F5F5;z-index: 2;" class="px-2 position-absolute">
				买的人还买了</view>
			<view class="position-absolute" style="height: 1upx;left: 0;right: 0;background-color: #DDDDDD;"></view>
		 </view>

		 <!-- 占位 -->
		 <view style="height: 100upx;"></view>
		 <!-- 合计 @click="doSelectAll" -->
		 <view class="d-flex a-center position-fixed left-0 right-0 bottom-0 border-top border-light-secondary a-stretch bg-white" style="height: 100rpx;z-index: 1000;">
			 <label class="radio d-flex a-center j-center flex-shrink"style="width: 120upx;">
			 	<radio :value="1" color="#FD6801"/>
				 <!-- :checked="checkedAll" :disabled="disableSelectAll"  -->
			 </label>
			 <template v-if="!isedit">
			 	<view class="flex-1 d-flex a-center j-center font-md">
			 		合计 <price :text="totalPrice"></price>
			 	</view>
				 <!--  @tap="orderConfirm" -->
			 	<view class="flex-1 d-flex a-center j-center main-bg-color text-white font-md" 
				 hover-class="main-bg-hover-color" style="height: 100%;"> 结算</view>
			 </template>
			 <template v-else>
			 	<view class="flex-1 d-flex a-center j-center font-md main-bg-color text-white" style="height: 100%;">
			 		移入收藏
			 	</view>
				 <!--  @tap="doDelGoods" -->
			 	<view class="flex-1 d-flex a-center j-center bg-danger text-white font-md" 
				 hover-class="main-bg-hover-color" style="height: 100%;">删除</view>
			 </template>
		 </view>
		 
		 <!-- 属性筛选框 -->



	</view>
</template>

<script>
import loading from '@/common/mixin/loading.js';
import uniNavBar from '@/components/uni-ui/uni-nav-bar/uni-nav-bar.vue';
import price from '@/components/common/price.vue';
import uniNumberBox from '@/components/uni-ui/uni-number-box/uni-number-box.vue';
// import { mapState,mapGetters,mapMutations,mapActions } from "vuex";
export default {
	components: {
		uniNavBar,
		price,
		uniNumberBox
	},
	data() {
		return {
			list: [
				{
					checked:false,
					id:1,
					cover: '../../static/images/demo/cate_01.png',
					title: '香油条',
					pprice: 500,
					minnum: 1,
					num: 5,
					maxnum: 10,
					skusText: [
						{
							title:'颜色',
							selected:0,
							list:[
								{name:"红"},
								{name:"黄"}
							]
							
						},{
							tltle:"容量",
							selected:0,
							list:[
								{name:"64"},
								{name:"128"}
							]
						},{
							tltle:"配置",
							selected:0,
							list:[
								{name:"标配"},
								{name:"套餐一"}
							]
						}
					]
				}
			],
			// checked:false,
			isedit: false
			//默认让购物车不处于编辑状态
		};
	},
	onLoad() {
		// console.log(JSON.stringify(this.$store.state.list))
		// console.log(JSON.stringify(this.list));
		// console.log(JSON.stringify(this.newList));
		// console.log(JSON.stringify(this.$store.getters.activeList));第一种getters
		// console.log(JSON.stringify(this.activeList));
		// console.log(JSON.stringify(this.noActiveList));
		// console.log(JSON.stringify(this.getList));
		// console.log(JSON.stringify(this.getById(1)));
		// this.$store.commit('inc')
		// this.inc(10)
		// this.AsyncIne(100)
	},
	computed: {
		//如果拿到state中的数据后需要进一步的过滤使用  建议使用对象方式
		// ...mapState({
		//   list:state=>state.cart.list,
		// // 通过mapState拿到state中cart的list
		//   // list:"list",
		//   //newList(state) {
		//   //  return state.cart.list.filter((v) => v.status);
		//   //},
		// }),
		//如果直接拿state中的数据可以直接使用数组的形式，多个数据使用逗号隔开
		// ...mapState([
		// 	'list'
		// ])
		// 第二种getters
		// ...mapGetters(['activeList','noActiveList','getList','getById'])
	},
	methods: {
		//   ...mapMutations(['inc']),
		//   ...mapActions(['AsyncIne'])
		// selectItem(){
		// 	this.checked = !this.checked
		// }
		changeNum(e,item,index){
			item.num=e
		}
	}
};
</script>

<style></style>
