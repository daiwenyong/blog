const express = require('express');
const router = express.Router();

const user = require('../controller/user/index.js');
const addCategory = require('../controller/category/add.js')
const Category = require('../controller/category/index.js')
const updateCategory = require('../controller/category/update.js')
const deleteCategory = require('../controller/category/delete.js')
const addContent = require('../controller/content/add.js')
const content = require('../controller/content/index.js');
const updateContent = require('../controller/content/update.js')
const deleteContent = require('../controller/content/delete.js')

// router.use('/',(req,res,next)=>{
//   if(!req.userInfo.isAdmin){
//     res.send('你不是管理员');
//     return;
//   }
//   next();
// })

router.get('/',(req,res)=>{
  res.render('admin/index',{
    userInfo:req.userInfo
  })
})

router.get('/user',user.showIndex)
router.get('/category/showAdd',addCategory.showAdd)
router.post('/category/add',addCategory.add)

router.get('/category',Category.showIndex)
router.get('/category/update',updateCategory.showUpdate)
router.post('/category/update',updateCategory.update)

router.post('/titleCategory',Category.showCategory)//前台导航分类请求数据

router.get('/category/delete',deleteCategory.showDelete)
router.post('/category/delete',deleteCategory.delete)

router.get('/content/add',addContent.showAdd)
router.post('/content/add',addContent.add)

router.get('/content',content.showIndex)

router.get('/content/update',updateContent.showUpdate)
router.post('/content/update',updateContent.update)

router.get('/content/delete',deleteContent.showDelete)
router.post('/content/delete',deleteContent.delete)

router.post('/getcontents',content.showContents)//前台内容列表页面请求数据
router.post('/getcontent',content.showContent)//前台单个内容页面请求数据
router.post('/getcomment',content.showComment)//评论
router.post('/goodnum',content.showGoodnum)



module.exports =  router;
