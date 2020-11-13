const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name:{ type: String },
  parent:{type: mongoose.SchemaTypes.ObjectId,ref:'Category'}, // ref:'Category' 表示要关联哪个模型
})

schema.virtual('children',{
  localField:'_id',
  foreignField:'parent',
  justOne:false,
  ref:'Category'
})

schema.virtual('newsList',{
  localField:'_id',
  foreignField:'categories',
  justOne:false,
  ref:'Article'
})

module.exports = mongoose.model('Category',schema)