 // 校核用户名和密码的中间件     verifyUser
 // 处理密码的中间件    passwordhandle

 // 引入错误类型 2种写法
// const {NAME_OR_PASSWORD_IS_REQUIRED} = require('../constants/error-types.js')
const errorTyoe = require('../constants/error-types.js')
const Userservices = require('../services/user-services.js');
const md5password = require('../untils/changepassword')

const verifyUser = async (ctx,next)=>{
    
    // 获取用户名和密码
    const {name,password} = ctx.request.body; 
    
    
    // 判断用户名和密码是否为空
    if( !name || !password ){
        const error =  new Error(errorTyoe.NAME_OR_PASSWORD_IS_REQUIRED)
        // console.log('发生了错误');
        return ctx.app.emit('error',error,ctx)
    }
    

    // 判断用户名是否已经创建
    // 应该调用数据库看是有返回的值
     const value = await Userservices.verify(name)
    
    if(value[0].length ){
        const error = new Error(errorTyoe.NAME_IS_REPETITION)
        return ctx.app.emit('error',error,ctx)
    }
  
    await next()
}

const passwordhandle = async (ctx,next)=>{
    //获取密码对密码进行加密处理
  
    const { password }  = ctx.request.body

    ctx.request.body.password =  md5password(password)
    
    await next()
}

module.exports = {
    verifyUser,
    passwordhandle
}