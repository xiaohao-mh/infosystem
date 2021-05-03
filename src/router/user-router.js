const router  = require('koa-router')

const useRouter = new router({prefix:'/users'})

const {
    verifyUser,passwordhandle
} = require('../middleware/user-middleware')


const {create} = require('../controller/userController')

// 在接收请求后对密码和用户名进行校核 verifyUser
// 对密码进行加密处理 passwordhandle
// 相当于再次出用了2个中间件，当一个中间件调用next后，create中间件就会实现
useRouter.post('/',verifyUser,passwordhandle,create)



module.exports = useRouter