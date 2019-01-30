var express=require('express');
var app =express();
const db= require('../db/config.js');
var mysql = require('mysql');
var router=express.Router();

//添加文章
router.post('/updateArticle',function(req,res){
  var reqData=req.body;
  var dbInsert="INSERT INTO blog_article_front(title,content,time,tab,see) VALUES(?,?,?,?,?)";
  var article_title=reqData.title;
  var article_content=reqData.content;
  var article_time=reqData.time;
  var article_tab=reqData.tab;
  var article_see=reqData.see;
  var articleInfo=[
      article_title,article_content,article_time,
      article_tab,article_see
  ]
  db(dbInsert,articleInfo,(err,data)=>{
    res.json({
      'status':200,
      'message':'添加成功'
    });
  })
})
//展示文章列表
router.get('/getArticle',function(req,res){
  var pageNum=req.query.pageNum-1;
  var pageSize=req.query.pageSize;
  var pgaeStart=pageNum*pageSize;
  var page={
  	total:"",
  	totalPage:""
  }
  //查询sql
  var articleAllSql="select * from blog_article_front";
  var articleLimitSql="select * from blog_article_front limit "+pgaeStart+","+pageSize+"";
  db(articleAllSql,(err,data)=>{
  	page.total=data.length;
  })
  db(articleLimitSql,(err,data)=>{
       res.json({
         status:200,
         data:data,
         totalNum:page.total,
         totalPage:Math.floor(page.total/pageSize)
       });
    })
});
//查询具体文章内容
router.get('/getArticleInfo',function(req,res){
	var articleId=req.query.id;
	var getSql="select * from blog_article_front where article_id ="+articleId;
	var getCommentSql="select * from blog_comment where comment_article_id ="+articleId;
	var commentData;
	db(getCommentSql,(err,data)=>{
		commentData=data;
  		db(getSql,(err,data)=>{
	  		res.json({
	         status:200,
	         data:data,
	         comment:commentData
	       });
  		})
  	})
	
})
module.exports = router;