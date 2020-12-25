<template>
	<div class="detail">
		<detail-nav-bar class="detail-nav"/>
		<scroll class="content1" ref="scroll">
		      <detail-swiper :top-images="topImages"/>
		      <detail-base-info :goods="goods"/>
		      <detail-shop-info :shop="shop"/>
		      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
			  <detail-param-info :param-info="detailParamInfo"/>
			  <detai-comment-info :comment-info="commentInfo"/>
			  <!-- <goods-list :goods="recommends"/> -->
		</scroll>
	</div>
</template>

<script>
	
	import DetailNavBar from './childrencomponents/DetailNavBar.vue'
	import DetailSwiper from './childrencomponents/DetailSwiper.vue'
	import DetailBaseInfo from './childrencomponents/DetailBaseInfo.vue'
	import DetailShopInfo from './childrencomponents/DetailShopInfo.vue'
	import DetailGoodsInfo from './childrencomponents/DetailGoodsInfo.vue'
	import DetailParamInfo from './childrencomponents/DetailParamInfo.vue'
	import DetaiCommentInfo from './childrencomponents/DetailCommentInfo.vue'
	//import GoodsList from '../../components/content/goods/GoodsList.vue'
	
	import Scroll from 'components/common/scroll/Scroll'
	
	import {getDetail,Goods,Shop,GoodsParam,getRecommend} from '../../network/detail.js'
	
	export default{
		name:"Detail",
		data(){
			return {
				iid:null,
				topImages:[],
				goods:{},
				shop:{},
				detailInfo:{},
				detailParamInfo:{},
				commentInfo:{},
				recommends:[]
			}
		},
		components:{
			DetailNavBar,
			DetailSwiper,
			DetailBaseInfo,
			DetailShopInfo,
			DetailGoodsInfo,
			DetailParamInfo,
			DetaiCommentInfo,
			//GoodsList,
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
				//2.5获取商品参数信息
				this.detailParamInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
				//2.6获取评论信息
				if(data.rate.cRate !==0){
					this.commentInfo=data.rate.list[0]
				}
			}),
			getRecommend().then(res =>{
				this.recommends =res.data.list
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
	 .detail {
	    position: relative;
	    z-index: 1;
	    background-color: #fff;
	    height: 100vh;
	  }
	
	  .detail-nav {
	    position: relative;
	    z-index: 9;
	    background-color: #fff;
	  }
	
	  .content1 {
	    height: calc(100% - 44px);
	  }
</style>
