const Content = require('../../schema/contents');

exports.showDelete = function (req,res) {
  let id = req.query.id;
  Content.findById(id).then((result)=>{
    console.log(result);
    res.render('admin/content/delete',{
      userInfo:req.userInfo,
      result
    })
  })
}

exports.delete = function (req,res) {
  let title = req.body.title;
  if(title==''){
    res.render('admin/error',{
      userInfo:req.userInfo,
      optionMessage:{
        location:'内容首页',
        option:'内容删除',
        message:'内容名称不能为空',
        href:'返回内容首页'
      }
    });
    return;
  }
  Content.findOne({title}).then(result=>{
    console.log(result);
    //let category = req.body.category;
    // let cate = req.query.category;
    if(!result){
      res.render('admin/error',{
        userInfo:req.userInfo,
        optionMessage:{
          location:'内容首页',
          option:'内容删除',
          message:'没有该内容',
          href:'返回内容首页'
        }
      });
      return;
    }else{
      Content.deleteOne({title}).then((result)=>{
        res.render('admin/success',{
          userInfo:req.userInfo,
          optionMessage:{
            location:'内容首页',
            option:'内容删除',
            message:'内容删除成功',
            href:'返回内容首页'
          },
          url:'/api/admin/content'
        })

      })
    }
  })

}

