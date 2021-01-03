<template>
	<div class="toast" v-show="isShow">
		<div class="toast-content">{{message}}</div>
	</div>
</template>

<script>
	export default{
		name:"Toast",
		data(){
			return {
				message:'',
				isShow:false
			}
		},
		methods:{
			show(message='默认提示',duation=1500){
				this.message =message
				this.isShow=true
				setTimeout(() =>{
					this.isShow=false
					this.message=''
				},duation)
			}
		}
	}
</script>

<style>
	.toast{
		position: fixed;
		top: 50%;
		left: 50%;
		padding: 8px,10px;
		transform: translate(-50%,-50%);
		background-color: rgb(0,0,0,.75);
		color: #FFFFFF;
		z-index: 999;
		font-size: 14px;
	}
	.toast-content{
	}
</style>
