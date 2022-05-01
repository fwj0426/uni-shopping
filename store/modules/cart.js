export default {
     // 存储数据
     state: {  
        // 选中列表（存放选中的id）
		selectedList:[],
        //购物车列表 
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
            },{
                checked:false,
                id:2,
                cover: '../../static/images/demo/cate_01.png',
                title: '北京烤鸭',
                pprice: 500,
                minnum: 1,
                num: 10,
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
                            {name:"128"},
                            {name:"64"},
                            
                        ]
                    },{
                        tltle:"配置",
                        selected:0,
                        list:[
                            {name:"套餐一"},
                            {name:"标配"},
                            
                        ]
                    }
                ]
            },{
                checked:false,
                id:3,
                cover: '../../static/images/demo/cate_01.png',
                title: '南京板鸭',
                pprice: 300,
                minnum: 1,
                num: 1,
                maxnum: 10,
                skusText: [
                    {
                        title:'颜色',
                        selected:0,
                        list:[
                            {name:"黄"},
                            {name:"红"},
                            
                        ]
                        
                    },{
                        tltle:"容量",
                        selected:0,
                        list:[
                            {name:"64"},
                            {name:"128"},
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
    },
    //计算属性 
    getters: {
        // 判断是否全选
        checkedAll:(state)=>{
            return state.list.lenght === state.selectedList.lenght
        },
        // 禁止全选
        disableSelectAll:(state)=>{
            return state.list.lenght === 0
        },
        // 合计
        totalPrice:(state)=>{
            // 总价
            var total = 0
            state.list.forEach(v=>{
                // 拿到列表里的每一个对象循环 选中的列表ID
                if(state.selectedList.indexOf(v.id) > -1 ){
                    total += v.pprice*v.num
                    // 总价等于价格乘以数量
                }
            })
            return total
        },
        // 购物车商品数量
		cartCount:(state)=>{
			if(state.list.length <= 99){
				return state.list.length
			}
			return '99+'
		}
    },
    // 同步方法
    mutations: {
        // 选中/取消选中某个商品
        selectItem(state,index){
            let id = state.list[index].id
            // 当前列表索引ID
            let i = state.selectedList.indexOf(id)
            // i是否在选中列表里面的ID
            // 之前是选中，取消选中 
			if (i > -1) {
				// 取消当前商品选中状态
				state.list[index].checked = false
				// 移除选中列表中的当前商品
				return state.selectedList.splice(i,1)
			}
            // 选中
			state.list[index].checked = true
			state.selectedList.push(id)
            // 把当前ID穿进去
        },
        // 全选
        selectAll(state){
            state.selectedList = state.list.map(v=>{
                // 将列表中选中的ID映射到selectedList数组中
                // 设置选中状态
                v.checked = true
                return v.id
            })
        },
        // 取消全选
        unSelectAll(state){
            state.list.forEach(v => {
                // 循环将列表里选中的状态取消
                // 设置选中状态
				v.checked = false
            });
            // 清空选中列表为空数组
            state.selectedList = []
        },
        // 删除选中
        delGoods(state){
			state.list = state.list.filter(v=>{
                // 拿到购物车列表中的索引数据进行过滤
				return state.selectedList.indexOf(v.id) === -1
                // 判断选中ID等于负一
			})
			// $U.updateCartBadge(state.list.length)
		},

    },
    // 异步方法
    actions: {
        doSelectAll({commit,getters}){
            // 拿选中的状态来判断是否全选或取消全选
            getters.checked ? commit('unSelectAll'): commit('selectAll')
        },
        doDelGoods({commit}){
			// if(state.selectedList.length === 0){
			// 	return uni.showToast({
			// 		title: '请选择要删除的商品',
			// 		icon: 'none'
			// 	});
			// }
			uni.showModal({
				content: '是否删除选中',
				success: (res)=>{
					if (res.confirm) {
                            commit('delGoods')
                            uni.showToast({
								title: '删除成功'
							});
						
					} 
				}
			});
		}

    }
}