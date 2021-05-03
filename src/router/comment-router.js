const router  = require('koa-router')

const commentRouter = new router()
// 添加对用户登录时的账号和密码做校核的中间件
const {verifyAuth,verifyPermission} = require("../middleware/login-middleware.js")

const {create,reply,update,commentRemove,momentidgetcomment} = require('../controller/commentController.js')


// 创建评论
commentRouter.post('/comment',verifyAuth,create)

// 回复评论 id是对第几条评论进行回复
commentRouter.post('/comment/:id/reply',verifyAuth,reply)

// 修改评论
commentRouter.patch('/comment/:commentid',verifyAuth,verifyPermission,update)
// commentRouter.patch('/comment/:commentid',verifyAuth,verifyPermission("comment"),update)

// 删除评论
commentRouter.delete('/comment/:commentid',verifyAuth,verifyPermission,commentRemove)

// 根据动态id 获取对应的评论 单独接口获取评论
commentRouter.get('/comment',momentidgetcomment)

module.exports = commentRouter