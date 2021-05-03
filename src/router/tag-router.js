const router  = require('koa-router')

const tagRouter = new router({prefix:"/tag"})
// 添加对用户登录时的账号和密码做校核的中间件
const {verifyAuth} = require("../middleware/login-middleware.js")

const {createTag,gettaglist} = require('../controller/tagController')

// 创建标签
tagRouter.post('/',verifyAuth,createTag)

// 获取标签信息 ，需要传入offset limit
tagRouter.get('/',gettaglist)

module.exports = tagRouter