const User = require('../../schema/users')
exports.showIndex =  function(req,res){
  let page = +req.query.page||1;   //1 2 0
  let limit =2;
     //2 2 4
  User.countDocuments().then(count=>{
    let maxPage = Math.ceil(count/limit);
    page = Math.min(page,maxPage);
    let skip = (page-1)*limit;
    User.find().limit(limit).skip(skip).sort({_id:-1}).then(users=>{
      res.render('admin/user/index',{
        userInfo:req.userInfo,
        users,
        page,
        maxPage
      })
    })
  })



}
