const Category = require('../../schema/categorys');

exports.showDelete = function (req,res) {
  var cate = req.query.category;
  //console.log(req.query,cate);
  res.render('admin/category/delete',{
    userInfo:req.userInfo,
    cate
  })
}

exports.delete = function (req,res) {
  let cate = req.query.category;
  let category = req.body.category;

  if(category==''){
    res.render('admin/error',{
      userInfo:req.userInfo,
      optionMessage:{
        location:'分类首页',
        option:'分类删除',
        message:'分类名称不能为空',
        href:'返回分类首页'
      }
    });
    return;
  }
  Category.findOne({name:category}).then(result=>{
    let category = req.body.category;
    // let cate = req.query.category;
    if(!result){
      res.render('admin//error',{
        userInfo:req.userInfo,
        optionMessage:{
          location:'分类首页',
          option:'分类删除',
          message:'没有该分类',
          href:'返回分类首页'
        }
      });
      return;
    }else{
      Category.deleteOne({name:category}).then((result)=>{
        res.render('admin/success',{
          userInfo:req.userInfo,
          optionMessage:{
            location:'分类首页',
            option:'分类删除',
            message:'分类删除成功',
            href:'返回分类首页'
          },
          url:'/api/admin/category'
        })

      })
    }
  })

}

