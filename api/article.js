var express=require('express');
var app =express();
const db= require('../db/config.js');
var mysql = require('mysql');
var router=express.Router();

//添加文章
router.post('/createArticle',function(req,res){
  var reqData=req.body;
  var dbInsert="INSERT INTO blog_article_front(title,content,tab_id) VALUES(?,?,?)";
  var article_title=reqData.title;
  var article_content=reqData.content;
  //var article_time=reqData.time;
  var article_tab=reqData.tab_id;
  //var article_see=reqData.see;
  var articleInfo=[
      article_title,
      article_content,
      //article_time,
      article_tab,
      //article_see
  ]
  db(dbInsert,articleInfo,(err,data)=>{
    res.json({
      'status':200,
      'message':'添加成功'
    });
  })
})

//更新浏览量
router.get('/updateSee',function(req,res){
  var reqData = req.query;
  var see = reqData.see;
  var articleId = reqData.articleId;
  var sql = 'UPDATE blog_article_front SET see = '+see+' WHERE article_id = '+articleId;
  db(sql,(err,data)=>{
    res.json({
      'status':200,
      'message':'修改浏览量成功'
    });
  })
})

//展示文章列表
router.get('/getArticle',function(req,res){
  var pageNum=req.query.pageNum-1;
  var pageSize=req.query.pageSize;
  var tabId=req.query.tabId;
  var title=req.query.keyword;
  var pgaeStart=pageNum*pageSize;
  var page={
  	total:"",
  	totalPage:""
  }
  //查询sql
  var searchStr = '';
  if(tabId != 0){
    searchStr = "WHERE tab_id = "+tabId;
  }
  if(title != ''){
    searchStr = 'WHERE title LIKE "%'+title+'%"';
  }

  var articleAllSql="select * from blog_article_front "+searchStr;
  var articleLimitSql="select a.*,b.tab_name from blog_article_front a LEFT JOIN blog_tab b ON a.tab_id = b.id "+searchStr+" order by article_id desc limit "+pgaeStart+","+pageSize+"";
  db(articleAllSql,(err,data)=>{
  	page.total=data.length;
    db(articleLimitSql,(err,data)=>{
      res.json({
       status:200,
       data:data,
       totalNum:page.total,
       totalPage:Math.ceil(page.total/pageSize)
      });
    })
  })
});
//查询具体文章内容
router.get('/getArticleInfo',function(req,res){
	var articleId=req.query.id;
  var pervId = parseInt(articleId) + 1;
  var nextId = parseInt(articleId) - 1;
	var getSql="select a.*,b.tab_name from blog_article_front a LEFT JOIN blog_tab b ON a.tab_id = b.id where article_id ="+articleId;
  var prevSql="select title, article_id from blog_article_front where article_id ="+pervId;
  var nextSql="select title, article_id from blog_article_front where article_id ="+nextId;
	var getCommentSql="select * from blog_comment where article_id ="+articleId+" ORDER BY time DESC";
	var commentData, prevData, nextData;
	db(getCommentSql,(err,cData)=>{
		commentData=cData;
    db(prevSql,(err,pData)=>{
      prevData=pData;
      db(nextSql,(err,nData)=>{
        nextData=nData;
        db(getSql,(err,data)=>{
          res.json({
            status:200,
            data:data,
            comment:commentData,
            prevData:prevData,
            nextData:nextData
          });
        })
      })
    })
	})
})
module.exports = router;