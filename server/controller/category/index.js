const Category = require('../../schema/categorys')
const Content = require('../../schema/contents');
exports.showIndex = function (req,res) {
  let page = +req.query.page||1;   //1 2 0
  let limit =2;
  //2 2 4
  Category.countDocuments().then(count=>{
    let maxPage = Math.ceil(count/limit);
    page = Math.min(page,maxPage);
    let skip = (page-1)*limit;
    Category.find().limit(limit).skip(skip).sort({_id:-1}).then(users=>{
      res.render('admin/category/showIndex',{
        userInfo:req.userInfo,
        users,
        page,
        maxPage
      })
    })
  })
}

exports.showCategory = function (req,res){
 // let where = req.body;
  let results = {};
  //console.log(category);
  Category.find().then((category)=>{
   // res.send(result)
    results.category = category;
    return Content.find().populate(['category','author'])
  }).then((content)=>{
    results.content = content;
    res.send(results)
  })
}
