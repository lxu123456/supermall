<template>
	<swiper>
		<swiper-item v-for="item in banners" :key="item.label">
			<a :href="item.link">
				<img :src="item.image" alt="" @load="swiperImageLoaded"/>
			</a>
		</swiper-item>
	</swiper>
</template>

<script>
	import {Swiper,SwiperItem} from '../../../components/common/swiper'
	export default{
		name:"homeSwiper",
		props:{
			banners:{
				type:Array,
				default(){
					return []
				}
			}
		},
		data(){
			return{
				isLoaded:false//轮播图加载完成事件，控制事件只发出去一次
			}
		},
		components:{
			Swiper,
			SwiperItem
		},
		methods:{
			swiperImageLoaded(){
				if(!this.isLoaded){
					this.$emit('swiperImageLoaded')
					this.isLoaded=true
				}
			}
		}
	}
</script>

<style>
</style>
