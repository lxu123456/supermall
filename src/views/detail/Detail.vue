<template>
	<div id="detail">
		<detail-nav-bar class="detail-nav"/>
		<scroll class="content" ref="scroll">
		      <detail-swiper :top-images="topImages"/>
		      <detail-base-info :goods="goods"/>
		      <detail-shop-info :shop="shop"/>
		      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
		</scroll>
	</div>
</template>

<script>
	
	import DetailNavBar from './childrencomponents/DetailNavBar.vue'
	import DetailSwiper from './childrencomponents/DetailSwiper.vue'
	import DetailBaseInfo from './childrencomponents/DetailBaseInfo.vue'
	import DetailShopInfo from './childrencomponents/DetailShopInfo.vue'
	import DetailGoodsInfo from './childrencomponents/DetailGoodsInfo.vue'
	
	import Scroll from 'components/common/scroll/Scroll'
	
	import {getDetail,Goods,Shop} from '../../network/detail.js'
	
	export default{
		name:"Detail",
		data(){
			return {
				iid:null,
				topImages:[],
				goods:{},
				shop:{},
				detailInfo:{}
			}
		},
		components:{
			DetailNavBar,
			DetailSwiper,
			DetailBaseInfo,
			DetailShopInfo,
			DetailGoodsInfo,
			Scroll
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
				//2.3获取店铺信息
				this.shop = new Shop(data.shopInfo)
				//2.4获取商品详细信息
				this.detailInfo = data.detailInfo
			})
		},
		 methods: {
		      imageLoad() {
		        this.$refs.scroll.refresh()
		      }
		    }
	}
</script>
	
<style>
	 #detail {
	    position: relative;
	    z-index: 9;
	    background-color: #fff;
	    height: 100vh;
	  }
	
	  .detail-nav {
	    position: relative;
	    z-index: 9;
	    background-color: #fff;
	  }
	
	  .content {
	    height: calc(100% - 44px);
	  }
</style>
