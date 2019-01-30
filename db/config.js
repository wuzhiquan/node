var mysql = require('mysql');
module.exports=function(sql,arg,callback){
	//数据库连接
	/*var connection = mysql.createConnection({
	  host     : 'w.rdc.sae.sina.com.cn',
	  user     : 'l25x5n3y1y',
	  password : '10jmywi43kwkmxmymyj445xj31wy2jhwzjjliky0',
	  database : 'app_wuzhiquan',
	  port:3306
	});*/

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


