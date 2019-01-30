let express=require('express');
let app =express();
let swig = require('swig');
let bodyParser = require("body-parser"); 
let article = require('./api/article.js');
let comment = require('./api/comment.js');
let tab = require('./api/tab.js');
const path = require('path')
app.use(bodyParser.urlencoded({ extended: false }));  

//模板渲染
swig.setDefaults({
  cache: false
})
app.set('view cache', false);
app.set('views','./views/');
app.set('view engine','html');
app.engine('html', swig.renderFile);

//设置跨域访问
app.all('*', function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "X-Requested-With,X-CSRF-Token,Content-Type");
   res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
   res.header("X-Powered-By",' 3.2.1');
   // res.header("Content-Type", "application/json;charset=utf-8");
   next();
});
app.use(express.static(path.join(__dirname, 'public')))
//index page
app.get('/',function(req, res){
	res.type('html');
    res.render('index.html',{
        title:'首页 ',
        content: 'hello swig'
    })
})
//文章接口
app.use('/article',article);
//评论接口
app.use('/comment',comment);
//标签接口
app.use('/tab',tab);
console.log('重启');
//配置服务端口 
let server = app.listen(5050, function () {
  let host = server.address().address;
  let port = server.address().port;
  console.log('成功连接', host, port);
});
