const express = require('express');
const router = express.Router();
const Users = require('../schema/users');

router.post('/register',(req,res)=>{
  let {username,password} = req.body;
  console.log(username, password);
  Users.findOne({
    username
  }).then((user)=>{
    if(user){ //如果用户存在  则注册失败 返回1
      res.send({
        errno: 1
      })
    }else{
      res.send({  //用户不存在 注册成功 返回0
        errno: 0
      })
      new Users({
        username,
        password,
      }).save()}
  })
});

router.post('/login',(req,res)=>{
  let {username,password} = req.body;
  Users.findOne({
    username,
    password,
  }).then((user)=>{
   // console.log(user,user.isAdmin);
    if(user){ //如果用户存在  则登录成功 返回0
      let isAdmin = user.isAdmin;
      let userInfo = {
        id:user.id,
        username,
        isAdmin
      };
      res.cookie('userInfo',JSON.stringify(userInfo),{maxAge:90000000000});
      res.send({
        errno: 0,
        username,
        isAdmin,
      });
    }else{
      res.send({  //用户不存在 登录失败 返回1
        errno: 1
      })
    }
  })
})
module.exports = router
