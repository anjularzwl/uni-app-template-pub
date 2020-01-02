
import Vue from 'vue'
import store from './store'
import App from './App'
import http from '@/core/http'

Vue.prototype.$http = http
Vue.prototype.$store = store
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App,
  store
})
app.$mount()
