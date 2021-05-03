const router  = require('koa-router')

const loginRouter = new router()
// 添加对用户登录时的账号和密码做校核的中间件
const {checklogin,verifyAuth} = require("../middleware/login-middleware.js")

const {login,success} = require('../controller/loginController.js')


loginRouter.post('/login',checklogin,login)
loginRouter.get('/test',verifyAuth,success)


module.exports = loginRouter