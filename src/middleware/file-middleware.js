
const Jimp = require('jimp')
const multer = require('koa-multer')
const {AVATAR_PATH,PICTURE_PATH} = require('../constants/filepath')
const path = require('path')
const upload = multer({
    dest:AVATAR_PATH
})

const uploadhandle = upload.single('avatar')

const uploadd = multer({
    dest:PICTURE_PATH
})
const uploadpicturehandle=uploadd.array('picture',9)

const imageshandle = async (ctx,next)=>{
    // 获取要处理的图片
    const files = ctx.req.files
    // 处理图片
    for(let i of files){
        const despath = path.join(i.destination,i.filename);
        Jimp.read(i.path).then(image=>{
            image.resize(1280,Jimp.AUTO).write(`${despath}-big`)
            image.resize(640,Jimp.AUTO).write(`${despath}-middle`)
            image.resize(320,Jimp.AUTO).write(`${despath}-small`)
        })
    }
    await next()
}


module.exports = {
    uploadhandle,
    uploadpicturehandle,
    imageshandle
}