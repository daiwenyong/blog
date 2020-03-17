const Category = require('../../schema/categorys');

exports.showAdd = function (req,res) {
  res.render('admin/category/add',{
    userInfo:req.userInfo
  })
}

exports.add = function (req,res) {
  let category = req.body.category;

  if(category==''){
    res.render('admin/category/error',{
      userInfo:req.userInfo,
      message:'分类名称不能为空',
    })
    return;
  }
  Category.findOne({name:category}).then(result=>{
    if(result){
      res.render('admin/category/error',{
        userInfo:req.userInfo,
        message:'分类名称已存在，不能重复添加',
      })
      return;
    }else{
      new Category({name:category}).save().then(()=>{
        res.render('admin/success',{
          userInfo:req.userInfo,
          optionMessage:{
            location:'分类首页',
            option:'分类添加',
            message:'分类添加成功',
            href:'返回分类首页'
          },
          url:'/api/admin/category/showAdd'
        })
      })
    }
  })


}
