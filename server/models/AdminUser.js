const mongoose = require('mongoose')

// npm i bcrypt 密码加密模块
const schema = new mongoose.Schema({
  username:{ type: String },
  password:{
    type:String,
    select:false,// 编辑的时候不需要查出来，否则再保存会再次加密
    set(val){
      return require('bcrypt').hashSync(val,10)
    }
  }
})

module.exports = mongoose.model('AdminUser',schema)