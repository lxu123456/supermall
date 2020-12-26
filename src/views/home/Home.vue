<template>
	<div id="home">
		<nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
		<tab-control :titles="['新款','流行','精选']"
					 @tabClick="tabClick" 
					 ref="tabControl1"
					 class="tab-control"
					 v-show="isFixed"/>
		<scroll class="content" ref="scroll" 
				v-bind:probeType="3" 
				:pullUpload="true" 
				@scroll="contentScroll" 
				@pullingUp="loadMore">
			<home-swiper :banners="banners" @swiperImageLoaded='swiperImageLoaded'/>
			<Home-Recommend :recommends="recommends"/>
			<home-feature />
			<tab-control :titles="['新款','流行','精选']" 
						 @tabClick="tabClick" 
						 ref="tabControl2"/>
			<goods-list :goods="showGoods"/>
		</scroll>
		<!--当给组件进行事件监听的时候，需要.native-->
		<back-top @click.native="backTopClick" v-show="isShowBackTop" />
	</div>
</template>

<script>
	import HomeSwiper from './childrencomponents/Home-Swiper.vue'
	import HomeRecommend from './childrencomponents/Home-Recommend.vue'
	import HomeFeature from './childrencomponents/Home-Feature.vue'
	
	import NavBar from '../../components/common/navbar/NavBar'
	import TabControl from '../../components/content/tabControl/TabControl.vue'
	
	import GoodsList from '../../components/content/goods/GoodsList.vue'
	import Scroll from '../../components/common/scroll/Scroll.vue'
	import BackTop from '../../components/content/backTop/BackTop.vue'
	
	
	import {getHomeMultidata,getHomeGoods} from '../../network/home'
	
	//import {debounce2} from '../../common/commonutils.js'
	import {imageListenerMixin} from '../../common/mixin.js'
	
	export default {
		name: "Home",
		components:{
			NavBar,
			HomeSwiper,
			HomeRecommend,
			HomeFeature,
			TabControl,
			GoodsList,
			Scroll,
			BackTop
		},
		data(){
			return{
				banners:[],
				recommends:[],
				 goods:{
					'pop':{page:0,list:[]},
					'new':{page:0,list:[]},
					'sell':{page:0,list:[]}
				},
				currentType:'pop',
				isShowBackTop:false,
				fun:null,
				tabOffsetTop:0,
				isFixed:false,
				scrollY:0
			}
		},
		mixins:[imageListenerMixin],
		computed:{
			showGoods(){
				return this.goods[this.currentType].list
			}
		},
		//离开tab页签会调用此函数,可以通过keep-alive取消
		destroyed() {
			console.log('destoryed...')
		},
		//进入tab页签会调用
		activated() {
			this.$refs.scroll.scrollTo(0,this.scrollY,0)
			this.$refs.scroll.refresh()
		},
		//离开tab页签会调用
		deactivated() {
			//保存位置
			this.scrollY=this.$refs.scroll.scrollY()
			//事件总线销毁
			this.$bus.$off('itemImageLoad',this.imageListener)
		},
		created(){
			//1.请求数据
			this.getHomeMultidata()
			//2.请求商品数据
			this.getHomeGoods('pop')
			this.getHomeGoods('new')
			this.getHomeGoods('sell')
		},
		mounted() {
			console.log('home mounted...')
		},
		methods:{
			debounce(fn,wait){
				if (this.fun!==null){
					clearTimeout(this.fun)
				}
				this.fun = setTimeout(fn,wait)
			},
			/**
			 * 事件监听相关的
			 */
			tabClick(index){
				switch(index){
					case 0:
						this.currentType='pop'
						break
					case 1:
						this.currentType='new'
						break
					case 2:
						this.currentType='sell'
						break
				}
				//解决better-control 吸顶效果后，点击tab显示不一致问题
				this.$refs.tabControl1.currentIndex=index
				this.$refs.tabControl2.currentIndex=index
			},
			backTopClick(){
				this.$refs.scroll.scrollTo(0,0,500)
			},
			contentScroll(position){
				//1.判断backTop是否显示
				this.isShowBackTop = -position.y>1000
				//2.判断tabControl是否吸顶（position:fixed）
				this.isFixed=-position.y >this.tabOffsetTop
			},
			loadMore(){
				this.getHomeGoods(this.currentType)
			},
			//监听轮播图加载完毕
			swiperImageLoaded(){
				//获取tabControl的offsetTop
				//所有组件都有一个$el属性，用于获取组件中的元素
				this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
				console.log(this.tabOffsetTop)
			},
			/**
			 * 网络请求相关的
			 */
			getHomeMultidata(){
				getHomeMultidata().then(res =>{
					this.banners=res.data.banner.list;
					this.recommends=res.data.recommend.list;
				})
			},
			getHomeGoods(type){
				const page = this.goods[type].page+1;
				getHomeGoods(type,page).then(res =>{
					this.goods[type].list.push(...res.data.list)
					this.goods[type].page +=1
					this.$refs.scroll.finishPullUp()
				})
			}
		}
	}
</script>

<style scoped>
	#home{
		/* padding-top: 44px; */
		height: 100vh;
		position: relative;
	}
	.home-nav{
		background-color: var(--color-tint);
		color: #FFFFFF;
		/*下面的css是原生滚动需要设置的，better-scroll就不需要这个了*/
		/* position: fixed;
		top: 0px;
		left: 0px;
		right: 0px;
		z-index: 9; */
	}
	
	.isFixed{
		position: fixed;
		left: 0px;
		right: 0px;
		top: 44px;
	}
	/* .tab-control{
		position: sticky;
		top: 44px;
		z-index: 9;
	} */
	.content{
		overflow: hidden;
		position: absolute;
		top: 44px;
		bottom: 49px;
		left: 0px;
		right: 0px;
	}
	
	.tab-control{
		position: relative;
		z-index: 9;
	}
</style>
