const Content = require('../../schema/contents');
exports.showIndex = function (req,res) {
  let page = +req.query.page||1;   //1 2 0
  let limit =2;
  //2 2 4
  Content.countDocuments().then(count=>{
    let maxPage = Math.ceil(count/limit);
    page = Math.min(page,maxPage);
    let skip = (page-1)*limit;
    Content.find().limit(limit).skip(skip).sort({_id:-1})
      .populate(['category','author'])//populate 里面的参数已关联其他集合
      .then(contents=>{
        res.render('admin/content/showIndex',{
        userInfo:req.userInfo,
        contents,
        page,
        maxPage
      })
    })
  })
}
//前台所有的内容
exports.showContents = function (req,res){
  //let category = req.query.category;
  let where = req.body
  Content.find(where).populate(['category','author']).then((result)=>{
    res.send(result)
  })
}
//前台每项内容
exports.showContent = function (req,res){
  //let category = req.query.category;
  let where = req.body
  Content.findById(where).populate(['category','author']).then((result)=>{
    res.send(result)
  })
}
//评论
exports.showComment = function (req,res){
  let {comment,_id,username} = req.body;
  let commentData = {
    comment,
    time:new Date,
    username
  }
  Content.findById({_id}).then((result)=>{
    result.comment.unshift(commentData);
    result.save().then(()=>{
      res.send(result.comment)
    })
  })
}
//点赞请求
exports.showGoodnum = function (req,res){
  let {goodNum,_id} = req.body;
  Content.findById({_id}).then((result)=>{
    result.views = goodNum;
    result.save()
  })
}



