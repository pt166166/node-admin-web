import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
import './style.css'

import http from './http'
Vue.prototype.$http = http

Vue.config.productionTip = false

// 由于图片上传没有使用自定义的 $http ，头里面也没有token，这里用mixin做统一处理
Vue.mixin({
  computed: {
    uploadUrl(){
      return this.$http.defaults.baseURL + '/upload'
    }  
  },
  methods: {
    getAuthHeaders(){
      return {
        Authorization:`bearer ${localStorage.token || ''}`
      }
    }
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
