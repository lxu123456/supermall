<template>
	<div id="home">
		<nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
		<home-swiper :banners="banners"/>
		<Home-Recommend :recommends="recommends"/>
		<home-feature />
		<tab-control :titles="['新款','流行','精选']" />
		<goods-list :goods="goods['pop'].list"/>
		<ul><li>2323</li><li>2323</li><li>2323</li><li>2323</li><li>2323</li><li>2323</li><li>2323</li><li>2323</li><li>2323</li><li>2323</li></ul>
	</div>
</template>

<script>
	import HomeSwiper from './childrencomponents/Home-Swiper.vue'
	import HomeRecommend from './childrencomponents/Home-Recommend.vue'
	import HomeFeature from './childrencomponents/Home-Feature.vue'
	
	import NavBar from '../../components/common/navbar/NavBar'
	import TabControl from '../../components/content/tabControl/TabControl.vue'
	
	import GoodsList from '../../components/content/goods/GoodsList.vue'
	
	
	import {getHomeMultidata,getHomeGoods} from '../../network/home'
	
	export default {
		name: "Home",
		components:{
			NavBar,
			HomeSwiper,
			HomeRecommend,
			HomeFeature,
			TabControl,
			GoodsList
		},
		data(){
			return{
				banners:[],
				recommends:[],
				 goods:{
					'pop':{page:0,list:[]},
					'new':{page:0,list:[]},
					'sell':{page:0,list:[]}
				}
			}
		},
		created(){
			//1.请求数据
			this.getHomeMultidata()
			//2.请求商品数据
			this.getHomeGoods('pop')
			this.getHomeGoods('new')
			this.getHomeGoods('sell')
		},
		methods:{
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
				})
			}
		}
	}
</script>

<style scoped>
	#home{
		padding-top: 44px;
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
	}
</style>
