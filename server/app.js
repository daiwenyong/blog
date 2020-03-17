const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const Category = require('./schema/categorys');
const Content = require('./schema/contents');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
const cookieParser = require('cookie-parser');
app.use(cookieParser());
let cors = require('cors');
app.use(cors());
//设置模板引擎
app.set('view engine','ejs')

app.use((req,res,next)=>{
  if(req.cookies.userInfo){
    req.userInfo = JSON.parse(req.cookies.userInfo);
  };
  //console.log(JSON.parse(req.cookies.userInfo));
  next();
})

app.use('/form', require('./routers/form'));//登录和注册后台处理
app.use('/admin', require('./routers/admin'));//后台数据处理


mongoose.connect('mongodb://localhost:27017/blogdb',{useNewUrlParser: true},(err)=>{
  if(!err){
    console.log('数据库链接成功~~');
    app.listen(4000)
  }
})
