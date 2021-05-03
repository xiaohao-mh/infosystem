// dotenv 模块可以把根木下的.env文件添加到全局process,env中
const fs = require('fs')
const path = require('path')
const dotenv  = require('dotenv')
dotenv.config()

const PUBLICK_KEY = fs.readFileSync(path.resolve(__dirname,'./keys/gong.key'))
const ONLY_KEY = fs.readFileSync(path.resolve(__dirname,'./keys/si.key'))
module.exports = {
    HOST,
    APP_PORT,
    MYSQL_PORT ,
    MYSQL_HOST ,
    MYSQL_USER ,
    MYSQL_PASSWORD,
    MYSQL_CONNECTIONS ,
    MYSQL_DATABASE
}    =  process.env
module.exports.PUBLICK_KEY = PUBLICK_KEY
module.exports.ONLY_KEY = ONLY_KEY