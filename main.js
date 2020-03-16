import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

Vue.prototype.$api = "https://www.imovietrailer.com/superhero"  // 生产环境
// Vue.prototype.api = "https://www.imovietrailer.com/superhero"  // 开发环境

// 获取用户信息
Vue.prototype.getUserInfo = function(key) {
	const userInfo = uni.getStorageSync("userToken")
	if(userInfo !== null & userInfo !== '' & userInfo !== undefined) {
		return userInfo
	} else {
		return null
	}
}

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
