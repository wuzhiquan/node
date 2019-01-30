var express=require('express');
var app =express();
const db= require('../db/config.js');
var mysql = require('mysql');
var router=express.Router();

//评论接口
router.post('/updateComment',function(req,res){
  var reqData=req.body;
  var params={
      comment_article_id:reqData.comment_article_id,
      comment_name:reqData.comment_name,
      comment_content:reqData.comment_content,
  }
  var dbInsert="INSERT INTO blog_comment(comment_article_id,comment_name,comment_content) VALUES(?,?,?)";

  var paramsInfo=[
      params.comment_article_id,
      params.comment_name,
      params.comment_content
  ]
  db(dbInsert,paramsInfo,(err,data)=>{
    res.json({
      'status':200,
      'message':'添加成功'
    });
  })
})

//获取评论列表
router.get('/getComment', function(req, res){
  var allComment = "select * from blog_comment";
  db(allComment, (err,data)=>{
    res.json({
     status:200,
     data:data
    });
  })
});

module.exports = router;