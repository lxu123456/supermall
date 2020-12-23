<template>
	<div id="detail">
		<detail-nav-bar/>
		<detail-swiper :topImages="topImages" />
		<detail-base-info :goods="goods"/>
	</div>
</template>

<script>
	
	import DetailNavBar from './childrencomponents/DetailNavBar.vue'
	import DetailSwiper from './childrencomponents/DetailSwiper.vue'
	import DetailBaseInfo from './childrencomponents/DetailBaseInfo.vue'
	
	import {getDetail,Goods} from '../../network/detail.js'
	
	export default{
		name:"Detail",
		data(){
			return {
				iid:null,
				topImages:[],
				goods:{}
			}
		},
		components:{
			DetailNavBar,
			DetailSwiper,
			DetailBaseInfo
		},
		created() {
			//1.商品id保存
			this.iid = this.$route.params.iid
			//2.根据id获取商品详情
			getDetail(this.iid).then(res =>{
				const data = res.result
				//2.1获取顶部轮播图数据
				this.topImages = data.itemInfo.topImages
				//2.2获取基础数据
				this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
			})
		}
	}
</script>

<style>
</style>
