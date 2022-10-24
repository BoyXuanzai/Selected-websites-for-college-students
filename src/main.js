import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI, { Loading } from 'element-ui'
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'
import 'animate.css'
import '@/assets/css/global.css'

import './assets/fonts/iconfont.css'
import './assets/font/iconfont.css'
import VueParticles from 'vue-particles'
import { parseTime } from './utils'
axios.defaults.baseURL = 'http://127.0.0.1:3000'
Vue.use(VueParticles)
Vue.use(ElementUI)
Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.filter('parseTime', (v) => parseTime(v, '{y}-{m}-{d}'))
let loadingInstance = null
// axios 请求拦截
// 配置请求的拦截器
axios.interceptors.request.use(config => {
  config.headers['Content-Type'] = 'application/json;charset=utf-8'
  // 为请求头对象添加token验证的Authorization字段
  config.headers.Authorization = window.sessionStorage.getItem('token')
  loadingInstance = Loading.service({ fullscreen: true })
  return config
})
// 配置响应拦截器
axios.interceptors.response.use(response => {
  loadingInstance.close()
  return response
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
