<template>
	<view>
		<!--轮播图组件-->
		<swiper indicator-dots autoplay :interval="3000" :duration="200" circular :style="getStyle">
			<block v-for="(item,index) in resdata" :key="index">
				<swiper-item>
					<view class="swiper-item" @tap="event(item,index)">
						<image :src="item.src" 
						lazy-load
						:style="getStyle"></image>
					</view>
				</swiper-item>
			</block>
		</swiper>
	</view>
</template>

<script>
	export default {
		props:{
			resdata:[Array,Object],
			height:{
				type:String,
				default:"350"
			},
			//预览
			preview:{
				type:Boolean,
				default:false
			}
		},
		computed: {
			getStyle() {
				return `height: ${this.height}rpx;`
			},
			getUrls(){
				var urls = []
				for (let v in this.resdata) {
					urls.push(this.resdata[v].src)
				}
				return urls
			}
		},
		methods:{
			event(item,index){
				if (this.preview) {
					//预览API
					return uni.previewImage({
						current:index,
						urls:this.getUrls, //预览图片
						indicator:"default"
					})
				}
			}
		}
	}
</script>

<style>
</style>
