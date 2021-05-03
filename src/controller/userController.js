// use的全局中间件

const services = require("../services/user-services.js")
class userController{
    async create(ctx,next){
  
        // 拿到用户发过来的信息
        const user = ctx.request.body
       
        // 调用操作数据库的方法
       
        const result = await services.create(user)
        
    
        ctx.body = result

    }
}

module.exports = new userController()