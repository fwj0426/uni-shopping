<template>
	<view class="d-flex">
		<image :src="resdata.big.src" lazy-load style="width: 373upx; height: 530upx;border-right: 2upx solid #F5F5F5;" @tap="event(resdata.big)"></image>
		<view class="d-flex flex-column">
			<image :src="resdata.smalltop.src" style="width: 375upx;height: 264upx; border-bottom: 2upx solid #F5F5F5;" @tap="event(resdata.smalltop)"></image>
			<image :src="resdata.smallbotton.src" style="width: 375upx;height: 264upx;" @tap="event(resdata.smallbotton)"></image>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			//对象
			resdata:Object
		},
		methods:{
			event(obj){
				console.log(obj)
			}
			
		}
	}
</script>

<style>
</style>
