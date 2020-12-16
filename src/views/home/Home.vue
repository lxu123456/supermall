<template>
	<div id="home">
		<nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
		<scroll class="content" ref="scroll" v-bind:probeType="3" :pullUpload="true" @scroll="contentScroll" @pullingUp="loadMore">
			<home-swiper :banners="banners"/>
			<Home-Recommend :recommends="recommends"/>
			<home-feature />
			<tab-control :titles="['新款','流行','精选']" @tabClick="tabClick" />
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
				isShowBackTop:false
			}
		},
		computed:{
			showGoods(){
				return this.goods[this.currentType].list
			}
		},
		created(){
			//1.请求数据
			this.getHomeMultidata()
			//2.请求商品数据
			this.getHomeGoods('pop')
			this.getHomeGoods('new')
			this.getHomeGoods('sell')
			//3.监听图片加载事件
			this.$bus.$on('itemImageLoad',() => {
				this.$refs.scroll.refresh()
			})
		},
		methods:{
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
			},
			backTopClick(){
				this.$refs.scroll.scrollTo(0,0,500)
			},
			contentScroll(position){
				this.isShowBackTop = -position.y>1000
			},
			loadMore(){
				this.getHomeGoods(this.currentType)
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
		position: fixed;
		top: 0px;
		left: 0px;
		right: 0px;
		z-index: 9;
	}
	.tab-control{
		position: sticky;
		top: 44px;
		z-index: 9;
	}
	.content{
		overflow: hidden;
		position: absolute;
		top: 44px;
		bottom: 49px;
		left: 0px;
		right: 0px;
	}
</style>
