// 此模块已废弃，这是最基础的用法，后续crud接口请求在 commonCRUD.js 中统一封装
module.exports = app =>{
  const express = require('express')
  const router = express.Router()

  // 引入数据模型 model
  const Category = require('../../models/Category')

  // 新增分类接口
  router.post('/categories',async (req,res)=>{
    const model = await Category.create(req.body)
    res.send(model)
  })
  // 查询分类列表接口
  router.get('/categories',async (req,res)=>{
    const data = await Category.find().populate('parent').limit(10)
    res.send(data)
  })
  // 根据id查询分类详情接口
  router.get('/categories/:id',async (req,res)=>{
    const model = await Category.findById(req.params.id)
    res.send(model)
  })
  // 根据id修改分类接口
  router.put('/categories/:id',async (req,res)=>{
    const model = await Category.findByIdAndUpdate(req.params.id,req.body)
    res.send(model)
  })
  // 根据id删除分类接口
  router.delete('/categories/:id',async (req,res)=>{
    await Category.findByIdAndDelete(req.params.id)
    res.send({
      success:true
    })
  })
  app.use('/admin/api',router)
}