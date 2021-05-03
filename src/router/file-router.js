
const router  = require('koa-router')

const fileRouter = new router({prefix:"/upload"})

const {   verifyAuth
} = require("../middleware/login-middleware.js")

const {   uploadhandle,uploadpicturehandle,imageshandle
} = require("../middleware/file-middleware")

const {  saveAvatarInfo,getAvatarInfo,savePictureFordb
} = require("../controller/fileController")
// 将上传的头像保存到数据库里
fileRouter.post("/avatar",verifyAuth,uploadhandle,saveAvatarInfo)
// 获取头像文件
fileRouter.get("/:avatarid/avatar",getAvatarInfo)
// 长传图片文件
fileRouter.post('/picture',verifyAuth,uploadpicturehandle,imageshandle,savePictureFordb)

module.exports = fileRouter
