// 项目中有很多crud接口，如果都要写一遍（如 index.js 里面的分类管理用了五个接口）会有很多冗余代码，这里做一些通用的crud接口封装
// cnpm i inflection 用于英文单复数转换 比如将 categories 转为 Category

module.exports = app =>{

  const express = require('express')

  const jwt = require('jsonwebtoken')

  const AdminUser = require('../../models/AdminUser')

  const assert = require('http-assert')

  // mergeParams:true 能将app.use('/admin/api/rest/:resource',router) 中的 resource 参数合并到某个具体请求接口中
  const router = express.Router({

    mergeParams:true

  })

  

  // 新增
  router.post('/',async (req,res)=>{

    const model = await req.Model.create(req.body)

    res.send(model)

  })

  // 查询列表 npm i http-assert 用于请求中的一些条件判断
  router.get('/', async (req,res)=>{
    // 引入数据模型 model, inflection 可将 categories 转为 Category
    //但是这种每个接口中获取Model的写法太麻烦，于是在app.use('/admin/api/rest/:resource',router)中加入中间件async(req,res,next)=>{}来便捷实现
    // const modelName = require('inflection').classify(req.params.resource)
    // const Model = require(`../../models/${modelName}`)

    // populate('parent')含义：parent相当于一个外键，populate能将外键（id）关联的一整条数据查出来，而不是只查外键（id）
    // 封装之后需要特殊处理，parent是分类才有的外键，其他是没有的
    // const data = await req.Model.find().populate('parent').limit(10)

    const queryOptions = {}

    if(req.Model.modelName==='Category'){

      queryOptions.populate = 'parent'

    }

    const data = await req.Model.find().setOptions(queryOptions).limit(100)

    res.send(data)
  })
  // 根据id查询详情
  router.get('/:id',async (req,res)=>{

    const model = await req.Model.findById(req.params.id)

    res.send(model)
  })
  // 根据id修改
  router.put('/:id',async (req,res)=>{

    const model = await req.Model.findByIdAndUpdate(req.params.id,req.body)

    res.send(model)
  })
  // 根据id删除
  router.delete('/:id',async (req,res)=>{

    await req.Model.findByIdAndDelete(req.params.id)

    res.send({

      success:true

    })
  })
  // token校验中间件封装
  const auth = require('../../middleware/auth')

  app.use('/admin/api/rest/:resource',auth(),async(req,res,next)=>{

    // 获取Model并放入req中
    const modelName = require('inflection').classify(req.params.resource)

    req.Model = require(`../../models/${modelName}`)

    next()
  },router)

  // 图片上传接口 ，这里需要用 multer 中间件来处理图片上传 npm i multer
  const multer = require('multer')

  const upload = multer({dest:__dirname+'/../../uploads'})

  app.post('/admin/api/upload',auth(),upload.single('file'),async(req,res)=>{

    const file = req.file

    file.url = `http://www.pengjianchao.top:3001/uploads/${file.filename}`

    res.send(file)
  })
  // 登录接口
  app.post('/admin/api/login',async(req,res)=>{

    const {username,password} = req.body

    // 1、根据用户名找用户

    const user = await AdminUser.findOne({username}).select('+password')// 由于model里面设置了面 select:false 这里要用 .select('+password') 才能查到

    assert(user,422,'用户不存在')
    // if(!user){
    //   return res.status(422).send({
    //     message:'用户不存在'
    //   })
    // }

    // 2、校验密码
    const isValid = require('bcrypt').compareSync(password,user.password)

    assert(isValid,422,'密码错误')
    //  if(!isValid){
    //   return res.status(422).send({
    //     message:'密码错误'
    //   })
    // }

    // 3、返回token，npm i jsonwebtoken
    
    const token= jwt.sign({ id:user._id },app.get('secret'))//  secret 为index.js里面自定义的全局变量，app.get和路由请求的app.get冲突，因此只能传入一个参数加以区分

    res.send({
      token
    })
  })

  // 统一错误处理函数
  app.use(async(err,req,res,next)=>{
    res.status(err.statusCode || 500).send({
      message:err.message
    })
  })
}