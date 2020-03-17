const Content = require('../../schema/contents');

exports.showUpdate = function (req,res) {
  let id = req.query.id;
  Content.findById(id).populate('category').then((result)=>{
    //console.log(result);
    res.render('admin/content/update',{
    userInfo:req.userInfo,
    result
  })
  })
}

exports.update = function (req,res) {
  let {title,url,description,content} = req.body;
  console.log(url);
  let id = req.query.id;
  if(title==''||description==''||content==''||url==''){
    res.render('admin/error',{
      userInfo:req.userInfo,
      optionMessage:{
        location:'内容首页',
        option:'内容修改',
        message:'有一项不能为空',
        href:'返回内容首页'
      }
    })
    return;
  }
  Content.updateOne({_id:id},{$set:{title,description,content,url}}).then(()=>{
            res.render('admin/success',{
              userInfo:req.userInfo,
              optionMessage:{
                location:'内容首页',
                option:'内容修改',
                message:'内容修改成功',
                href:'返回内容首页'
              },
              url:'/api/admin/content'
            })
      })
}
