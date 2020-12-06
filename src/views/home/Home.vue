<template>
	<div id="home">
		<nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
		<home-swiper :banners="banners"/>
	</div>
</template>

<script>
	import NavBar from '../../components/common/navbar/NavBar'
	import HomeSwiper from './childrencomponents/Home-Swiper.vue'
	import {getHomeMultidata} from '../../network/home'
	
	export default {
		name: "Home",
		components:{
			NavBar,
			HomeSwiper
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
	.home-nav{
		background-color: var(--color-tint);
		color: #FFFFFF;
	}
</style>
