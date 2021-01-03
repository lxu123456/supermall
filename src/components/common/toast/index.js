import Toast from './Toast.vue'

const obj ={}

obj.install = function(Vue){
	
	console.log('toast组件开始加载....')

	//1.创建组件构造器
	const toastConstructor = Vue.extend(Toast)
	
	//2.根据组件构造器创建一个组件对象
	const toast = new toastConstructor()
	
	//3.将组件对象挂载到一个元素上
	toast.$mount(document.createElement('div'))
	
	//4.toast.$el对应的就是div
	document.body.appendChild(toast.$el)
	
	//5.toast赋值给Vue原型
	Vue.prototype.$toast = toast
}

export default obj