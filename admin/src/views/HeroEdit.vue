<template>
  <div class="about">
    <h1>{{id?'编辑':'新建'}}英雄</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-tabs value="base" type="border-card">
        <el-tab-pane label="基础信息" name="base">
          <el-form-item label="名称">
            <el-input v-model="model.name" style="width:30rem;"></el-input>
          </el-form-item>
          <el-form-item label="头像">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :headers="getAuthHeaders()"
              :show-file-list="false"
              :on-success="afterUpload">
              <img v-if="model.avatar" :src="model.avatar" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="Banner">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :headers="getAuthHeaders()"
              :show-file-list="false"
              :on-success="res=>$set(model,'banner',res.url)">
              <img v-if="model.banner" :src="model.banner" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="称号">
            <el-input v-model="model.title" style="width:30rem;"></el-input>
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="model.categories" multiple>
              <el-option v-for="item in categories" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="难度">
            <el-rate :max="5" show-score style="margin-top:0.7rem" v-model="model.scores.difficult"></el-rate>
          </el-form-item>
          <el-form-item label="技能">
            <el-rate :max="5" show-score style="margin-top:0.7rem" v-model="model.scores.skills"></el-rate>
          </el-form-item>
          <el-form-item label="攻击">
            <el-rate :max="5" show-score style="margin-top:0.7rem" v-model="model.scores.attack"></el-rate>
          </el-form-item>
          <el-form-item label="生存">
            <el-rate :max="5" show-score style="margin-top:0.7rem" v-model="model.scores.survive"></el-rate>
          </el-form-item>
          <el-form-item label="顺风出装">
            <el-select v-model="model.items1" multiple>
              <el-option v-for="item in items" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="逆风出装">
            <el-select v-model="model.items2" multiple>
              <el-option v-for="item in items" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用技巧">
            <el-input v-model="model.usageTips" type="textarea" style="width:30rem;"></el-input>
          </el-form-item>
          <el-form-item label="对抗技巧">
            <el-input v-model="model.battleTips" type="textarea" style="width:30rem;"></el-input>
          </el-form-item>
          <el-form-item label="团战思路">
            <el-input v-model="model.teamTips" type="textarea" style="width:30rem;"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="技能" name="skills">
          <el-button  size="small" @click="model.skills.push({})"><i class="el-icon-plus" ></i>添加技能</el-button>
          <el-row type="flex" style="flex-wrap:wrap;">
            <el-col :md="12" v-for="(item,index) in model.skills" :key="index">
                <el-form-item label="名称">
                  <el-input v-model="item.name"></el-input>
                </el-form-item>
                <el-form-item label="图标">
                  <el-upload
                    class="avatar-uploader"
                    :action="uploadUrl"
                    :headers="getAuthHeaders()"
                    :show-file-list="false"
                    :on-success="res=>$set(item,'icon', res.url)">
                    <img v-if="item.icon" :src="item.icon" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-form-item>
                <el-form-item label="冷却值">
                  <el-input  v-model="item.delay"></el-input>
                </el-form-item>
                <el-form-item label="消耗">
                  <el-input  v-model="item.cost"></el-input>
                </el-form-item>
                <el-form-item label="描述">
                  <el-input type="textarea" v-model="item.discription"></el-input>
                </el-form-item>
                <el-form-item label="小提示">
                  <el-input type="textarea" v-model="item.tips"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button size="small" type="danger"
                  @click="model.skills.splice(index,1)"
                  >删除</el-button>
                </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="最佳搭档" name="partners">
          <el-button  size="small" @click="model.partners.push({})"><i class="el-icon-plus" ></i>添加搭档</el-button>
          <el-row type="flex" style="flex-wrap:wrap;">
            <el-col :md="12" v-for="(item,index) in model.partners" :key="index">
                <el-form-item label="英雄">
                  <el-select filterable v-model="item.hero">
                    <el-option v-for="hero in heroes" :key="hero._id" :value="hero._id" :label="hero.name"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="描述">
                  <el-input type="textarea" v-model="item.discription"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button size="small" type="danger"
                  @click="model.partners.splice(index,1)"
                  >删除</el-button>
                </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <el-form-item style="margin-top:2rem;" >
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
    props: {
      id:{type:String}
    },
    data(){
      return {
        heroes:[],// 英雄列表
        categories:[],
        items:[],
        model:{
          name:'',
          avatar:'',
          title:'',
          skills:[],
          partners:[],
          scores:{
            difficult:0, // 难度
            skills:0, // 技能
            attack:0, // 攻击
            survive:0, // 生存
          }
        }
      }
    },
    created () {
      this.id&&this.fetch()
      this.fetchCategories()
      this.fetchItems()
      this.fetchHeroes()
    },
    methods: {
      // 获取英雄列表
      async fetchHeroes(){
          const res= await this.$http.get('/rest/heroes')
          this.heroes = res.data
      },
     async save(){
        let res
        if(this.id){
          console.log('修改')
          res = await this.$http.put(`/rest/heroes/${this.id}`,this.model)
        }else{
          res = await this.$http.post('/rest/heroes',this.model)
           console.log('新增')
        }
        
        console.log('保存结果',res)
        // 新增成功后跳转到分类列表
        this.$router.push('/heroes/list')
        this.$message({
          type:'success',
          message:'保存成功！'
        })
      },
      async fetch(){
        const res = await this.$http.get(`/rest/heroes/${this.id}`)
        // this.model = res.data
        this.model = Object.assign({},this.model,res.data)
      },
      async fetchCategories(){
        const res = await this.$http.get(`/rest/categories`)
        this.categories = res.data
      },
      async fetchItems(){
        const res = await this.$http.get(`/rest/items`)
        this.items = res.data
      },
      afterUpload(res, file) {
        this.model.avatar = res.url
        // this.$set(this.model,'avatar',res.url) model里面没有定义avatar字段的时候用这种写法
      }
    }
  }
</script>

