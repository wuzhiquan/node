var express=require('express');
var app =express();
const db= require('../db/config.js');
var mysql = require('mysql');
var router=express.Router();

//评论接口
router.post('/createComment',function(req,res){
  var reqData=req.body;
  var params={
      article_id:reqData.article_id,
      name:reqData.name,
      content:reqData.content,
      contact:reqData.contact
  }
  var dbInsert="INSERT INTO blog_comment(article_id,name,content,contact) VALUES(?,?,?,?)";

  var paramsInfo=[
      params.article_id,
      params.name,
      params.content,
      params.contact
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
  var allComment = "SELECT a.article_id,a.name,a.content,a.time,b.title FROM blog_comment a LEFT JOIN blog_article_front b ON a.article_id=b.article_id ORDER BY a.time DESC";
  db(allComment, (err,data)=>{
    res.json({
     status:200,
     data:data
    });
  })
});

module.exports = router;