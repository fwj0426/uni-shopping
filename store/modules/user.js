import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)

import cart from "@/store/modules/cart.js"
import path from "@/store/modules/path.js"
import user from "@/store/modules/user.js"



export default new Vuex.Store({
    // 存储数据
    state:{

    },
    // 计算属性
    getters: {
        
    },
    // 同步方法
    mutations: {
        
    },
    // 异步方法
    actions: {
        
    },
    
	modules:{
		cart,
		path,
		user
	}
})