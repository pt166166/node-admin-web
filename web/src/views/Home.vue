<template>
  <div>
    <!-- 轮播图插件 npm install swiper vue-awesome-swiper --save -->
    <swiper ref="mySwiper" :options="swiperOptions">
      <swiper-slide>
        <img class="w-100" src="../assets/images/210794580bb9303653804bb7b482f2a4.jpeg" alt>
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/210794580bb9303653804bb7b482f2a4.jpeg" alt>
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/210794580bb9303653804bb7b482f2a4.jpeg" alt>
      </swiper-slide>
      <div class="swiper-pagination pagination-home text-right px-3 pb-1" slot="pagination"></div>
    </swiper>
    <!-- end of swiper -->
    <div class="nav-icons bg-white mt-3  text-center pt-3 text-dark-1">
      <div class="d-flex flex-wrap">
        <div class="nav-item mb-3" v-for="n in 10" :key="n">
          <i class="sprite sprite-news"></i>
          <div class="py-2">爆料站</div>
        </div>
      </div>
      <div class="bg-light py-2 fs-sm">
        <i class="sprite sprite-arrow mr-1"></i>
        <span>收起</span>
      </div>
    </div>
    <!-- end of nav icons -->
    <m-list-card icon="menu1" title="新闻资讯" :categories="newsCategory">
      <!-- #items="{category}" category是父组件中具名slot name='items' 传过来的数据 -->
      <template #items="{category}"> 
        <router-link tag='div' :to="`/articles/${news._id}`" class="py-2 fs-lg d-flex" v-for="(news,i) in category.newsList" :key="i">
          <span class="text-info">[{{news.categoryName}}]</span>
          <span class="px-2">|</span>
          <span class="flex-1 text-dark-1 text-ellipsis pr-2">{{news.title}}</span>
          <span class="text-grey-1 fs-sm">{{news.createdAt | date}}</span>
        </router-link>
      </template>
    </m-list-card>
    <m-list-card icon="card-hero" title="英雄列表" :categories="heroCategory">
      <template #items="{category}"> 
        <div  class="d-flex flex-wrap" style="margin:0 -0.5rem">
          <router-link tag='div' :to="`/heroes/${hero._id}`" class="p-2 text-center" style="width:20%;" v-for="(hero,i) in category.heroList" :key="i">
            <img :src="hero.avatar" class="w-100">
            <div>{{hero.name}}</div>
          </router-link>
        </div>
      </template>
    </m-list-card>
    
  </div>
</template>
<script>
import dayjs from 'dayjs'
  export default {
    filters: {
      // 处理时间格式 npm i dayjs 
      date(val){
        return dayjs(val).format('MM/DD')
      }
    },
    name: 'carrousel',
    data() {
      return {
        newsCategory:[
          {
            name:'热门',
            newsList:new Array(5).fill({}).map(item=>({categoryName:'公告',title:'标题',date:'06/01'}))
          },
          {
            name:'新闻',
            newsList:new Array(5).fill({}).map(item=>({categoryName:'公告',title:'标题',date:'06/01'}))
          },
          {
            name:'公告',
            newsList:new Array(5).fill({}).map(item=>({categoryName:'公告',title:'标题',date:'06/01'}))
          },
          {
            name:'活动',
            newsList:new Array(5).fill({}).map(item=>({categoryName:'公告',title:'标题',date:'06/01'}))
          },
          {
            name:'赛事',
            newsList:new Array(5).fill({}).map(item=>({categoryName:'公告',title:'标题',date:'06/01'}))
          }
        ],
        heroCategory:[],
        swiperOptions: {
          pagination: {
            el: '.pagination-home'
          },
          // Some Swiper option/callback...
        }
      }
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.$swiper
      }
    },
    mounted() {
      console.log('Current Swiper instance object', this.swiper)
      this.swiper.slideTo(3, 1000, false)
    },
    created () {
      // 获取新闻列表
      this.fetchNewsCats()
      // 获取英雄列表
      this.fetchHeroCats()
    },
    methods: {
      // 获取新闻列表
      async fetchNewsCats(){
        const res = await this.$http.get('/news/list')
        
        this.newsCategory = res.data

      },
      // 获取新闻列表
      async fetchHeroCats(){
        const res = await this.$http.get('/heroes/list')
        
        this.heroCategory = res.data

      }
    }
  }
</script>
<style lang="scss">
@import "../assets/scss/variables";

.pagination-home {
  .swiper-pagination-bullet {
    opacity: 1;
    border-radius: 0.1538rem;
    background: map-get($colors, "white");
    &.swiper-pagination-bullet-active {
      background: map-get($colors, "info");
    }
  }
}
.nav-icons {
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
  .nav-item {
    width: 25%;
    border-right: 1px solid $border-color;
    &:nth-child(4n) {
      border-right: none;
    }
  }
}
</style>
