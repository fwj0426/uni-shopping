export default {
     // 存储数据
     state: {
        number:1,
        list: [
            {
                id: 1,
                name: "yi",
                status:true,
                num:10,
            },{
                id: 2,
                name: "er",
                status:false,
                num:12,
            },{
                id: 3,
                name: "san",
                status:true,
                num:15,
            },{
                id: 4,
                name: "si",
                status:false,
                num:3,
            },{
                id: 5,
                name: "wu",
                status:true,
                num:5,
            },{
                id: 6,
                name: "liu",
                status:false,
                num:6,
            },
            
        ]
    },
    //计算属性 
    getters: {
        activeList:(state)=>{
            return state.list.filter(v=>{
                return v.status
            })
        },
        noActiveList:(state)=>{
            return state.list.filter(v=>{
                return !v.status
            })
        },
        getList(state,getters){
            return getters.activeList.filter(v=>{
                return v.num > 5
            })
        },
        getById:(state)=>(id)=>{
            return v.id === id
        }

    },
    // 同步方法
    mutations: {
        inc(state,n){
            state.number += n
            // console.log(state.number) 
        }
    },
    // 异步方法
    actions: {
        AsyncIne({commit,state},n){
            console.log(n) 
            // this.$store.commit(),
            setInterval(()=>{
                commit('inc',20)
                console.log(state.number)
            },2000)
        }
    }
}