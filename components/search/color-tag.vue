<template>
	<view class="px-2 py-1 border d-inline-block m-1" :style="getStyle" @click="$emit('click')">{{ item.name }}</view>
</template>

<script>
export default{
	props:{
		item:Object,
		color:{
			type:Boolean,
			default:true
		}
	},
	computed:{
		getStyle() {
			//判断常用分类color为false默认颜色
			if(!this.color){    
				return `border:0;background:#f5f5f5`;
			}		
			let color = {
				borderColor:[ '#EEA6AA','#DD6A4B','#98D5D8','#9DBE93','#BCCD99' ],
				background:[ '#F8EAE9','#FFBEC6','#E8F6F6','#E4F5E2','#F2F6E8' ]
			}
			let index = Math.floor(Math.random()*color.borderColor.length)
			//随机获取颜色
			let borderColor = color.borderColor[index]
			//拿到颜色长度索引
			let background = color.background[index]
			return `background: ${background};border-color: ${borderColor};`
			//
		}
	}
}
</script>

<style></style>
