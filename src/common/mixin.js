import {debounce2} from './commonutils.js'

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