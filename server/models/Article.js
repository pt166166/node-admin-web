const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title:{ type: String },
  categories:[{type: mongoose.SchemaTypes.ObjectId,ref:'Category'}], 
  content:{type:String},
},{
  // 自动生成时间 updatedAt createdAt
  timestamps:true
})

module.exports = mongoose.model('Article',schema)