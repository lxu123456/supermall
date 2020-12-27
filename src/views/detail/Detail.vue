<template>
	<div class="detail">
		<detail-nav-bar class="detail-nav" @detailNavClick="detailNavClick" ref="detailNav"/>
		<scroll class="content1" ref="scroll" @scroll="contentScroll">
		      <detail-swiper :top-images="topImages"/>
		      <detail-base-info :goods="goods"/>
		      <detail-shop-info :shop="shop"/>
		      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
			  <detail-param-info ref="detailParamInfo" :param-info="detailParamInfo"/>
			  <detai-comment-info ref="commentInfo" :comment-info="commentInfo"/>
			  <detail-goods-list ref="recommends" :goods="recommends" />
		</scroll>
		<detail-bottom-bar />
		<!--当给组件进行事件监听的时候，需要.native-->
		<back-top @click.native="backTopClick" v-show="isShowBackTop" />
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
	import DetailGoodsList from '../../components/content/goods/GoodsList.vue'
	import DetailBottomBar from './childrencomponents/DetailBottomBar.vue'
	
	import Scroll from 'components/common/scroll/Scroll'
	
	import {getDetail,Goods,Shop,GoodsParam,getRecommend} from '../../network/detail.js'
	import {imageListenerMixin,backTopMixin} from '../../common/mixin.js'
	import {debounce2} from '../../common/commonutils.js'
	
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
				recommends:[],
				themeTopYs:[],
				getThemeTopYs:null,
				currentIndex:null
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
			DetailGoodsList,
			DetailBottomBar,
			Scroll
		},
		mixins:[imageListenerMixin,backTopMixin],
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
			//3.获取推荐信息
			getRecommend().then(res =>{
				this.recommends =res.data.list
			}),
			//4.给themeTopYs赋值，防抖
			this.getThemeTopYs = debounce2(()=>{
				this.themeTopYs=[]
				this.themeTopYs.push(0)
				this.themeTopYs.push(this.$refs.detailParamInfo.$el.offsetTop)
				this.themeTopYs.push(this.$refs.commentInfo.$el.offsetTop)
				this.themeTopYs.push(this.$refs.recommends.$el.offsetTop)
				this.themeTopYs.push(Number.MAX_VALUE)
				console.log(this.themeTopYs)
			},200)
			
		},
		mounted() {
			
		},
		destroyed() {
			this.$bus.$off('itemImageLoad',this.imageListener)
		},
		 methods: {
			  imageLoad() {
				this.$refs.scroll.refresh()
				this.getThemeTopYs()
			  },
			  detailNavClick(index){
				  this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],100)
			  },
			  //监听滚动，联动顶端的nav-bar
			  contentScroll(position){
				  const positionY = -position.y
				  let length = this.themeTopYs.length
				  for (let i = 0; i < length-1; i++) {
				  	if(this.currentIndex!==i &&(positionY>=this.themeTopYs[i] && positionY<this.themeTopYs[i+1]))
					{
						this.currentIndex=i
						this.$refs.detailNav.currentIndex = this.currentIndex
					}
				  }
				  this.backTopListener(position)
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
	    height: calc(100% - 44px - 49px);
	  }
</style>
