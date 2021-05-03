const jwt = require("jsonwebtoken")
const {PUBLICK_KEY} = require('../app/config')
const Userservices = require('../services/user-services.js')
const authServices = require("../services/auth_services.js")
const errorTyoe = require('../constants/error-types.js')
const md5password = require('../untils/changepassword')
const checklogin = async  (ctx,next) =>{
        const { name , password } = ctx.request.body
        // 1.判断用户名是否为空
        if( !name || !password ){
            const error =  new Error(errorTyoe.NAME_OR_PASSWORD_IS_REQUIRED)
            // console.log('发生了错误');
            return ctx.app.emit('error',error,ctx)
    
        }
        // 2.判断用户名是否存在
        const value = await Userservices.verify(name)
     
        if( !value[0][0] ){
            const error = new Error(errorTyoe.USER_IS_NOT_EXIST)
            return ctx.app.emit('error',error,ctx)
        }
    
        // 3.判断密码加密后和数据库里面的密码是否正确
        // value 已经从数据库里拿出了数据出来
        const pwd =value[0][0].password
      
        if(md5password(password) !== pwd){
            const error = new Error(errorTyoe.PASSWORD_IS_NOT_RIGHT)
      
            
            return ctx.app.emit('error',error,ctx)
        }
        ctx.userinfo = value[0][0]
        await next()


}

const verifyAuth = async (ctx,next)=>{
  
    // 验证token
    const authorization = ctx.headers.authorization
    // 如果没有渠道token
    if(!authorization){
        const error = new Error(errorTyoe.ANUTHORRIZATION)
        ctx.app.emit('error',error,ctx)
    }
    const token = authorization.replace('Bearer ','')
   
    
    try {
        const result = jwt.verify(token,PUBLICK_KEY,{
            algorithms:["RS256"]
        })
        ctx.user = result
        
        await next();
    } catch (err) {
        const error = new Error(errorTyoe.ANUTHORRIZATION)
        ctx.app.emit('error',error,ctx)
    }
      
}

const   verifyPermission = async (ctx,next)=>{
   
    // 获取整个params
    let  table = Object.keys(ctx.params)[0]
    let  tablename = table.replace('id','')
    
    const chnageId = ctx.params[table]
    const {id} = ctx.user

    
    const ispermission = await authServices.checkTable(tablename,chnageId,id)
  
    if(ispermission){
        await next()
    }else{
        const error = new Error(errorTyoe.UNPERMISSION)
        ctx.app.emit('error',error,ctx)
    }
}
// const   verifyPermission = async (tablename)=>{
//     return (ctx,next)=>{
//         // 获取整个params
//         let  table = Object.keys(ctx.params)[0]
        
//         const chnageId = ctx.params[table]
//         const {id} = ctx.user
//         console.log(tablename,chnageId,id);
//         const ispermission = await authServices.checkTable(tablename,chnageId,id)
      
//         if(ispermission){
//             await next()
//         }else{
//             const error = new Error(errorTyoe.UNPERMISSION)
//             ctx.app.emit('error',error,ctx)
//         }
//     }
// }
module.exports = {
    checklogin,
    verifyAuth,
    verifyPermission
}