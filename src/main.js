import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import toast from 'components/common/toast/Toast.vue'
//添加事件总线对象
Vue.prototype.$bus=new Vue()
//安装toast对象
Vue.use(toast)


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
