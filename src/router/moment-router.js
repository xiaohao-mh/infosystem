const router  = require('koa-router')

const momentRouter = new router({prefix:"/moment"})
// 添加对用户登录时的账号和密码做校核的中间件
const {verifyAuth,verifyPermission} = require("../middleware/login-middleware.js")

const {create,getUserMoment,getUserMoments,update,remove,addtags,getpicture} = require('../controller/momentController')

const {verifytagisexists} = require("../middleware/tag-middleware")
// 创建动态
momentRouter.post('/',verifyAuth,create)
// 根据指定用户 查询单个数据    或者 跟就id查询单条用户数据
momentRouter.get("/:momentid",getUserMoment)
// 根据offset ,limit 查询多条动态
momentRouter.get("/",getUserMoments)

// 用户修改动态
momentRouter.patch('/:mmid',verifyAuth,verifyPermission,update)
momentRouter.delete('/:mmid',verifyAuth,verifyPermission,remove)


// 给动态添加标签
momentRouter.post('/:momentid/tags',verifyAuth,verifyPermission,verifytagisexists,addtags)

//获取图片专用接口
momentRouter.get('/pictures/:infos',getpicture)

module.exports = momentRouter