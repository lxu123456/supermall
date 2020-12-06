<template>
	<div id="home">
		<nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
		<home-swiper :banners="banners"/>
		<Home-Recommend :recommends="recommends"/>
		<home-feature></home-feature>
	</div>
</template>

<script>
	import NavBar from '../../components/common/navbar/NavBar'
	import HomeSwiper from './childrencomponents/Home-Swiper.vue'
	import HomeRecommend from './childrencomponents/Home-Recommend.vue'
	import HomeFeature from './childrencomponents/Home-Feature.vue'
	import {getHomeMultidata} from '../../network/home'
	
	export default {
		name: "Home",
		components:{
			NavBar,
			HomeSwiper,
			HomeRecommend,
			HomeFeature
		},
		data(){
			return{
				banners:[],
				recommends:[]
			}
		},
		created() {
			//1.请求数据
			getHomeMultidata().then(res =>{
				this.banners=res.data.banner.list;
				this.recommends=res.data.recommend.list;
			})
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
	}
</style>
