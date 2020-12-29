import Vue from 'vue'
import Vuex from 'vuex'
//1.安装vuex插件
Vue.use(Vuex)

//2.创建vuex对象
const store = new Vuex.Store({
	state:{
		carList:[]
	},
	mutations:{
		addCounter(state,payload){
			payload.count++
		},
		addToCart(state,payload){
			state.carList.push(payload)
		}
	},
	actions:{
		addCart(context,payload){
			let oldProduct = context.state.carList.find(item =>item.iid === payload.iid)
			if(oldProduct){
				context.commit('addCounter',oldProduct)
			}else{
				payload.count=1
				context.commit('addToCart',payload)
			}
		}
	}
})

//3.挂载到vue上
export default store