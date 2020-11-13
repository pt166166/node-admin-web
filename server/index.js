const  express = require("express")

const app = express()

// 设置一个全局变量，用于jwt加密
app.set('secret','abcdefg')

// Category.create()  数据库插入数据的时候需要用到 json 中间件
app.use(express.json())

// 跨域
app.use(require('cors')())

// 数据库
require('./plugins/db')(app)

// 指定静态文件夹 /uploads ,目的在于让 uploads 下面的文件可以访问
app.use('/uploads',express.static(__dirname+'/uploads'))

// PC端打包文件放在server目录下，指定该文件夹可以访问(托管静态资源)
app.use('/admin',express.static(__dirname+'/admin'))

// web端打包文件放在server目录下，指定该文件夹可以访问(托管静态资源)
app.use('/',express.static(__dirname+'/web'))

// PC端管理系统模块路由
require('./routes/admin/commonCRUD')(app)

// web端模块路由
require('./routes/web')(app)

app.listen(3000,()=>{
  console.log('服务启动成功：http://localhost:3000')
})