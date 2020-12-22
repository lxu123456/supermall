<template>
	<div id="detail">
		<detail-nav-bar/>
		<detail-swiper :topImages="topImages" />
	</div>
</template>

<script>
	
	import DetailNavBar from './childrencomponents/DetailNavBar.vue'
	import DetailSwiper from './childrencomponents/DetailSwiper.vue'
	
	import {getDetail} from '../../network/detail.js'
	
	export default{
		name:"Detail",
		data(){
			return {
				iid:null,
				topImages:[]
			}
		},
		components:{
			DetailNavBar,
			DetailSwiper
		},
		created() {
			//1.商品id保存
			this.iid = this.$route.params.iid
			//2.根据id获取商品详情
			getDetail(this.iid).then(res =>{
				//2.1获取顶部轮播图数据
				this.topImages = res.result.itemInfo.topImages
			})
		}
	}
</script>

<style>
</style>
