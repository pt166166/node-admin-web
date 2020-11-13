module.exports = app =>{
  const mongoose = require('mongoose')
  mongoose.connect('mongodb://127.0.0.1:27017/node-react-web',{
      useNewUrlParser:true,
      useUnifiedTopology: true
  },(err)=>{
    if(err){
      console.log('数据库连接失败！')
    }else{
      console.log('数据库连接成功！')
    }
  })

  // npm i require-all  此模块用于把某个文件夹下面所有文件引用进来
  // 这里用于把models里面的数据模型全部引入进来
  require('require-all')(__dirname+'/../models')
}