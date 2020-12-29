<template>
  <nav-bar class="cart-nav-bar">
	  <div slot="center">购物车({{$store.state.carList.length}})</div>
  </nav-bar>
</template>

<script>
  import NavBar from '../../components/common/navbar/NavBar.vue'
  
  export default {
    name: "Cart",
	components:{
		NavBar
	}
  }
</script>

<style scoped>
	.cart-nav-bar{
		background-color: var(--color-tint);
		color: #FFFFFF;
	}
</style>
