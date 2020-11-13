const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name:{ type: String }, // 名称
  avatar:{type: String}, // 头像
  banner:{type: String}, // 背景图
  title:{type: String}, // 称号
  categories:[{type: mongoose.SchemaTypes.ObjectId,ref:'Category'}], // 英雄类型 ，因为英雄的类型可能有多个，所以这里用数组
  scores:{ // 英雄属性评分
    difficult:{type:Number}, // 难度
    skills:{type:Number}, // 技能
    attack:{type:Number}, // 攻击
    survive:{type:Number}, // 生存
  },
  skills:[{ // 技能
    icon:{type:String},// 图标
    name:{type:String},// 名称
    delay:{type: Number}, // 冷却值
    cost:{type: Number}, // 消耗
    discription:{type:String},// 介绍
    tips:{type:String},// 提示
  }],
  items1:[{ // 顺风出装
    type: mongoose.SchemaTypes.ObjectId,ref:'Item'
  }],
  items2:[{ // 逆风出装
    type: mongoose.SchemaTypes.ObjectId,ref:'Item'
  }],
  usageTips:{type:String}, // 使用技巧
  battleTips:{type:String}, // 对抗技巧
  teamTips:{type:String}, // 团战思路
  partners:[{// 英雄搭档
    hero: {type: mongoose.SchemaTypes.ObjectId,ref:'Hero'},
    discription: { type: String }
  }], 
})

module.exports = mongoose.model('Hero',schema,'heroes') // 第三个参数指定集合名称