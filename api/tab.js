var express=require('express');
var app =express();
const db= require('../db/config.js');
var mysql = require('mysql');
var router=express.Router();


//获取标签列表
router.get('/getTab', function(req, res){
  var allComment = "select * from blog_tab";
  db(allComment, (err,data)=>{
    res.json({
     status:200,
     data:data
    });
  })
});

//获取菜单列表
router.get('/getMenu', function(req, res){
  var allComment = "select * from blog_menu";
  db(allComment, (err,data)=>{
    res.json({
     status:200,
     data:data
    });
  })
});

module.exports = router;