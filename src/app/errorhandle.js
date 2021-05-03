//监听error 错误处理文件
const errorTypes = require('../constants/error-types')
const errorhandle = (error,ctx)=>{
    let status,message;
    
    switch(error.message){
        case errorTypes.NAME_OR_PASSWORD_IS_REQUIRED:
            status = 409       // bad rwquest 参数错误
            message = "用户名或密码不能为空"
           
            break;
        case errorTypes.USER_IS_NOT_EXIST:
            status = 409       // 参数错误
            message = "用户名不存在"
            
            break;    
        case errorTypes.NAME_IS_REPETITION:
            status = 409      //  参数错误
            message = "用户名已存在"
            
            break; 
        case errorTypes.PASSWORD_IS_NOT_RIGHT:
            status = 409      //  参数错误
            message = "密码不正确"
            
            break;   
        case errorTypes.UNPERMISSION:
        status = 409      //  参数错误
        message = "您没有权限修改"
        
        break;    
        case errorTypes.ANUTHORRIZATION:
            status = 401     //  未授权的
            message = "无效的token"
            break;             
        default:
            status = 404
            message ="NOT FOUND"
    }
    ctx.status = status
    ctx.body  = message
   
}
module.exports = errorhandle