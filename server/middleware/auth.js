module.exports = options =>{
  const jwt = require('jsonwebtoken')

  const AdminUser = require('../models/AdminUser')

  const assert = require('http-assert')

  return async(req,res,next)=>{

    // 这个中间件用于token校验
    const token = String(req.headers.authorization||'').split(' ').pop()
    assert(token,401,'请先登录')

    // 通过秘钥找到 签名时用到的user._id
    const {id} = jwt.verify(token,req.app.get('secret'))
    assert(id,401,'请先登录')

    req.user = await AdminUser.findById(id)
    assert(req.user,401,'请先登录')

    await next()
  }
}