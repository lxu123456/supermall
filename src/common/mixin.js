import {debounce2} from './commonutils.js'
import BackTop from '../components/content/backTop/BackTop.vue'

export const imageListenerMixin ={
	data(){
		return{
			imageListener:null
		}
	},
	mounted() {
		const refresh = debounce2(this.$refs.scroll.refresh,50)
		this.imageListener = () => {
			//this.debounce(this.$refs.scroll.refresh,50)
			refresh()
		} 
		//1.监听图片加载事件
		this.$bus.$on('itemImageLoad',this.imageListener)
		console.log('image mix in...')
	}
}

export const backTopMixin = {
	components:{
		BackTop
	},
	data(){
		return {
			isShowBackTop:false
		}
	},
	methods:{
		backTopClick(){
			this.$refs.scroll.scrollTo(0,0,500)
		},
		backTopListener(position){
			this.isShowBackTop = -position.y>1000
		}
	}
}