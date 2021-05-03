// 数据库实例文件
const mysql = require('mysql2')
const config = require('./config.js')
const connections = mysql.createPool({
    host: config.MYSQL_HOST,
    port: config.MYSQL_PORT ,
    queueLimit:config.MYSQL_CONNECTIONS,
    user:config.MYSQL_USER,
    password :config.MYSQL_PASSWORD,
    database:config.MYSQL_DATABASE
})
// MYSQL_PORT ,
// MYSQL_HOST ,
// MYSQL_USER ,
// MYSQL_PASSWORD,
// MYSQL_CONNECTIONS 
connections.getConnection((err,conn)=>{
    if(err){
        console.log('连接数据库失败');
    }else{
        console.log('连接数据库成功');
    }
})

module.exports = connections.promise()