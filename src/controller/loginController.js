// use的全局中间件
const jwt = require('jsonwebtoken')
const services = require("../services/user-services.js")
const {ONLY_KEY} = require("../app/config.js")
class loginController{
    async login(ctx,next){ 
        const {id,name} = ctx.userinfo
        const token = jwt.sign({id,name},ONLY_KEY,{
            expiresIn:60*60*24,
            algorithm:"RS256"    
        })
        ctx.body = {
            id,
            name,
            token
        }
    }
    async success(ctx,next){
        
 
        ctx.body = '授权成功'
    }
}

module.exports = new loginController()