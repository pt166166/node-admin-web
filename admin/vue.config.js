module.exports = {
  // 打包文件输出到 server 的 admin 文件夹
  outputDir:__dirname + '/../server/admin',
  // 加访问前缀 admin
  publicPath: process.env.NODE_ENV === 'production'? '/admin/': '/'
}