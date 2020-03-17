const mongoose = require('mongoose');
//存入准确时间
// let fn = function () {
//   const d = new Date(Date.now());
//   d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
//   return d.toISOString();
// };

const contentSchema = new mongoose.Schema({
  category:{//分类
    type:mongoose.Schema.Types.ObjectId,
    ref: 'categorys'
  },
  //描述
  description:String,
  title:String,
  content:String,
  author:{
    type:mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  time:{
    type:Date,
    default:new Date
  },
  //评论
  comment:{
    type:Array,
    default: []
  },
  //点赞量
  views:{
    type:Number,
    default:0,
  },
  url:String
});
module.exports = mongoose.model('contents',contentSchema)

