const Koa = require('koa')
// const useRouter = require('../router/user-router')
// const loginRouter = require("../router/login-router")
const app = new Koa()

// 错误处理函数
const errorhandle = require('./errorhandle.js')
// koa中解析json数据
const bodyparser = require('koa-bodyparser')

const userouterFn = require('../router/index')

app.use(bodyparser())
// app.use(useRouter.routes())
// app.use(useRouter.allowedMethods())

// app.use(loginRouter.routes())
// app.use(loginRouter.allowedMethods())
userouterFn(app)
// 错误处理函数
app.on('error',errorhandle)
// app.on('error',(error,ctx)=>{
//     console.log(error.message);
    
// })
module.exports = app 