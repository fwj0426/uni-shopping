import App from './App'

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
//全局组件
import divider from "@/components/common/divider.vue"
Vue.component('divider',divider)
// 引入全局加载动画
import loading from "@/components/common/loading.vue"
Vue.component('loading',loading)


App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif