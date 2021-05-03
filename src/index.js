const app = require('./app/index.js')

// 引用全局变量文件
const config = require('./app/config.js')

// 数据库操作
require('./app/database.js')


//监听端口号
app.listen(config.APP_PORT,()=>{
    console.log(`${config.APP_PORT}端口已经开启`);
})