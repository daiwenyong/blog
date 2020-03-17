const Content = require('../../schema/contents');
const Category = require('../../schema/categorys');

exports.showAdd = function (req,res) {
  Category.find().then(results=>{
    res.render('admin/content/add',{
      userInfo:req.userInfo,
      results
    })
  })

}

exports.add = function (req,res) {
  let {category,url,title,description,content} =  req.body;

  if(category==''){
    res.render('admin/category/error',{
      userInfo:req.userInfo,
      message:'分类名称不能为空',
    })
    return;
  };
  if(url==''){
    res.render('admin/category/error',{
      userInfo:req.userInfo,
      message:'分类名称不能为空',
    })
    return;
  };
  if(description==''){
    res.render('admin/error',{
      userInfo:req.userInfo,
      optionMessage:{
        location:'内容首页',
        option:'内容添加',
        message:'内容描述不能为空',
      }
    });
    return;
  };
  if(content==''){
    res.render('admin/error',{
      userInfo:req.userInfo,
      optionMessage:{
        location:'内容首页',
        option:'内容添加',
        message:'内容主体不能为空',
      }
    });
    return;
  };
  new Content({
    url,
    category,
    title,
    description,
    content,
    author:req.userInfo.id,
  }).save().then(()=>{
          res.render('admin/success',{
            userInfo:req.userInfo,
            optionMessage:{
              location:'内容首页',
              option:'内容添加',
              message:'内容添加成功',
              href:'返回内容首页'
            },
            url:'/api/admin/content/add'
          })
  })


}
