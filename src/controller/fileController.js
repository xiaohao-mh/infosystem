const fileServices = require("../services/file_services")
const fs = require('fs')
const {AVATAR_PATH} = require("../constants/filepath")
const { APP_PORT, HOST} = require('../app/config')
 class fileController{
     async saveAvatarInfo(ctx,next){
         // 获取数据
        
        const { filename,mimetype,size } = ctx.req.file
        const {  id  }= ctx.user
    
         // 保存到数据库
         const result  = await fileServices.createfile(filename,mimetype,size,id)

         // 将图片保存到user表中
        const avatarurl = `${HOST}:${APP_PORT}/upload/${id}/avatar`
       
         await fileServices.saveavatarurl(avatarurl,id)

         ctx.body = '头像长传成功'
     }
     async getAvatarInfo(ctx,next){
        //查询要哪个用户的头像
        const { avatarid } = ctx.params
     
        let  result = await fileServices.getAvatar(avatarid)
   
        ctx.response.set('content-type',result.mimetype)
        // fs.createReadStream((`${AVATAR_PATH}/${result[0].filename}`) )
        
        ctx.body = fs.createReadStream(`${AVATAR_PATH}/${result.filename}`) 

     }
     async savePictureFordb(ctx,next){
         // 获取上传的图片信息
        const files =  ctx.req.files
         const {  id  }= ctx.user
         // 查询为哪个动态上传图片
         const { momentid  } = ctx.query
         for(let i of files){
             //插入每一条数据到数据库中
             let { filename,mimetype,size }  = i
             await fileServices.savepicture(filename,mimetype,size,id,momentid)
         }
         ctx.body = {
             message:"图片长传服务器成功"
         }
     }
}
module.exports = new fileController()