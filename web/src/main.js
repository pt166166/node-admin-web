import Vue from 'vue'
import App from './App.vue'

// npm i -D sass sass-loader
import './assets/scss/style.scss'

// 路由
import router from './router'

//  轮播图插件 npm install swiper vue-awesome-swiper --save 
import VueAwesomeSwiper from 'vue-awesome-swiper'
// import style (<= Swiper 5.x)
import 'swiper/css/swiper.css'
Vue.use(VueAwesomeSwiper, /* { default options with global component } */)

// 引入字体图标
import './assets/iconfont/iconfont.css'

// 引入自定义卡片组件为全局组件
import Card from './components/Card.vue'
Vue.component('m-card',Card)
import ListCard from './components/ListCard.vue'
Vue.component('m-list-card',ListCard)

// 引入axios
import axios from 'axios'
Vue.prototype.$http = axios.create({
  baseURL:process.env.VUE_APP_API_URL || '/web/api',
  // baseURL:'http://localhost:3000/web/api'
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
