<template>
  <view class="p-2">
      <view class="font-lg">{{detail.title}}</view>
      <viwe class="font text-light-muted mb-3 line-h-sm">{{detail.desc}}</viwe>
      <price priceSize="font-lg" unitSize="font" :text="showPrice"></price>
      <!-- {{detail.pprice}} -->
  </view>
</template>

<script>
import price from "@/components/common/price.vue"

export default {

  // name: 'base-info',
  components: {
    price,
  },
  props: ['detail','showPrice']
}
</script>

<style>

</style>