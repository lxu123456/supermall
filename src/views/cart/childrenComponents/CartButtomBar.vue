<template>
	<div class="cart-buttom-bar">
		<div class="check-all-area">
			<check-button v-model="isSelectedAll" @checkBtnClick="checkBtnClick" class="check-button"></check-button>
			<span class="check-content">全选</span>
		</div>
		<div class="cart-total">
			 合计：{{totalPrice}}
		</div>
		<div class="cart-count">
			去计算：{{productCount}}
		</div>
	</div>
</template>

<script>
	import CheckButton from './CheckButton.vue'
	export default{
		name:"CartButtomBar",
		components:{
			CheckButton
		},
		computed:{
			totalPrice(){
				return '￥'+this.$store.state.carList.filter((item) => {return item.checked})
						   .reduce((preValue,item) => {return preValue+item.count*item.price},0)
			},
			productCount(){
				return this.$store.state.carList.filter((item) => {return item.checked}).length
			},
			isSelectedAll(){
				if(this.$store.state.carList.length ===0) return false
				return !this.$store.state.carList.find((item) => !item.checked)
			}
		},
		methods:{
			checkBtnClick(){
				let isSelectedAll = this.$store.state.carList.find((item) => !item.checked)
				if(isSelectedAll){
					this.$store.state.carList.forEach((item) =>{
						item.checked=true
					})
				}else{
					this.$store.state.carList.forEach((item) =>{
						item.checked=false
					})
				}
			}
		}
	}
</script>

<style>
	.cart-buttom-bar{
		width: 100%;
		height: 40px;
		background-color: #eee;
		display: flex;
		font-size: 14px;
	}
	.check-all-area{
		width: 90px;
		display: flex;
	}
	
	.check-button{
		margin-top: 10px;
	}
	
	.check-content{
		margin-top: 10px;
		margin-left: 10px;
	}
	
	.cart-total{
		margin-top: 10px;
		flex: 1;
	}
	
	.cart-count{
		width: 90px;
		background-color: #FF5777;
		color: #FFFFFF;
		text-align: center;
		line-height: 40px;
	}
	
</style>
