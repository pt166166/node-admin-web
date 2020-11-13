<template>
    <div class='page-hero' >
       <div class="topbar bg-black py-2 px-3 d-flex ai-center text-white">
          <img src="../assets/logo.png" height="30">
          <div class="px-2 flex-1 ai-center" style="align-items: center;">
            <span class="text-white">王者荣耀</span>
            <span class="ml-2">攻略站</span>
          </div>
          <!-- &gt; 表示 > 符号，< 用&lt; -->
          <router-link tag='div' to='/' style="align-items: center;">更多英雄 &gt;</router-link>
        </div>
        <div class="top" :style="{'background-image':`url(${model.banner})`}">
          <div class="info text-white p-3 ">
            <div>{{model.title}}</div>
            <h2 class="my-2">{{model.name}}</h2>
            <div>{{model.categories.map(v=>v.name).join('/')}}</div>
            <div class="d-flex jc-between pt-2">
              <div class="scores d-flex ai-center">
                <span>难度</span>
                <span class="bg-primary badge">{{model.scores.difficult}}</span>
                <span>技能</span>
                <span class="bg-blue-1 badge">{{model.scores.skills}}</span>
                <span>攻击</span>
                <span class="bg-danger badge">{{model.scores.attack}}</span>
                <span>生存</span>
                <span class="bg-dark badge">{{model.scores.survive}}</span>
              </div>
              <router-link to="/" tag="span" class="text-grey fs-sm">
                皮肤：2 &gt;
              </router-link>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
      id:{type:String,require:true}
    },
    data() {
        return {
          model:{
            categories:[],
            scores:{}
          }
        };
    },
    computed: {

    },
    created() {
      this.fetch()
    },
    mounted() {

    },
    watch: {

    },
    methods: {
      async fetch(){
        const res = await this.$http.get(`/heroes/${this.id}`)
        console.log(res.data)
        this.model = res.data
      }
    },
    components: {

    },
};
</script>

<style lang="scss">
.page-hero{
    .top{
      height: 50vw;
      background: #fff no-repeat top center;
      background-size: 100% auto;
    }
    .info{
      background: linear-gradient(rgba(0,0,0,0),rgba(0,0,0,1));
      .scores{
        .badge{
          margin: 0 0.25rem;
          display: inline-block;
          width: 1rem;
          height: 1rem;
          line-height: 1rem;
          text-align: center;
          border-radius: 50%;
          font-size: 0.8rem;
          border: 1px solid rgba($color: #fff, $alpha: 0.3)
        }
      }
    }
}
</style>
