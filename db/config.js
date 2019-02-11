var mysql = require('mysql');
module.exports=function(sql,arg,callback){
	//数据库连接

	var connection = mysql.createConnection({
	  host     : 'localhost',
	  user     : 'root',
	  password : 'root',
	  database : 'blog',
	  port:3306
	});

	//2.开始连接数据库
	connection.connect();

	//3.对数据库的增删改查操作
	connection.query(sql,arg,(err,data)=>{
	    callback && callback(err,data);
	})
	//4.关闭数据库
	connection.end();
}


