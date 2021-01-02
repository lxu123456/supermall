<template>
	<div class="cart-list">
		<scroll class="content2" ref="scroll">
			<cart-list-item v-for="item in $store.state.carList" :key="item.iid" :itemInfo="item" />
		</scroll>
	</div>
</template>

<script>
	
	import CartListItem from './CartListItem.vue'
	import Scroll from '../../../components/common/scroll/Scroll.vue'
	
	export default{
		name:"cartList",
		components:{
			CartListItem,
			Scroll
		},
		activated() {
			this.$refs.scroll.refresh()
		}
	}
</script>

<style>
	.cart-list{
		height: calc(100% - 44px - 49px - 40px);
	}
	.content2{
		height: 100%;
		overflow: hidden;
	}
</style>
