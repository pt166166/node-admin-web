module.exports = {
  // 打包文件输出到 server 的 web 文件夹
  outputDir:__dirname + '/../server/web',
  // 加访问前缀 
  publicPath: process.env.NODE_ENV === 'production'? '/': '/'
}