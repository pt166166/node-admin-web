<template>
  <div class="about">
    <h1>{{id?'编辑':'新建'}}文章</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="所属分类">
        <el-select v-model="model.categories" multiple>
          <el-option v-for="item in categories" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="详情">
        <vue-editor v-model="model.content" useCustomImageHandler @image-added="handleImageAdded"></vue-editor>
      </el-form-item>
      <el-form-item >
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import { VueEditor }  from 'vue2-editor' // 富文本编辑器
  export default {
    props: {
      id:{type:String}
    },
    components: {
      VueEditor
    },
    data(){
      return {
        model:{},
        categories:[]
      }
    },
    created () {
      this.id&&this.fetch()
      this.fetchCategories()
    },
    methods: {
      // 自定义富文本图片上传 ,如果用自带的保存之后会变为base64，体积太大
      async handleImageAdded(file, Editor, cursorLocation, resetUploader){
        const formData = new FormData()
        formData.append('file',file)
        const res = await this.$http.post(`/upload`,formData)
        Editor.insertEmbed(cursorLocation,'image',res.data.url)
        resetUploader()
      },
     async save(){
        let res
        if(this.id){
          console.log('修改')
          res = await this.$http.put(`/rest/articles/${this.id}`,this.model)
        }else{
          res = await this.$http.post('/rest/articles',this.model)
           console.log('新增')
        }
        console.log('保存结果',res)
        // 新增成功后跳转到文章列表
        this.$router.push('/articles/list')
        this.$message({
          type:'success',
          message:'保存成功！'
        })
      },
      async fetch(){
        const res = await this.$http.get(`/rest/articles/${this.id}`)
        console.log(res)
        this.model = res.data
      },
      async fetchCategories(){
        const res = await this.$http.get(`/rest/categories`)
        this.categories = res.data
      }
    }
  }
</script>

