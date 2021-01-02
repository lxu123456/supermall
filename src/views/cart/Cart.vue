<template>
	<div class="cart1">
		<nav-bar class="cart-nav-bar">
			  <div slot="center">购物车({{$store.state.carList.length}})</div>
		</nav-bar>
		<cart-list></cart-list>
		<cart-buttom-bar></cart-buttom-bar>
	</div>
</template>

<script>
  import NavBar from '../../components/common/navbar/NavBar.vue'
  import CartList from './childrenComponents/CartList.vue'
  import CartButtomBar from './childrenComponents/CartButtomBar.vue'
  
  export default {
    name: "Cart",
	components:{
		NavBar,
		CartList,
		CartButtomBar
	}
  }
</script>

<style scoped>
	.cart1{
		height: 100vh;
	}
	.cart-nav-bar{
		background-color: var(--color-tint);
		color: #FFFFFF;
	}
</style>
