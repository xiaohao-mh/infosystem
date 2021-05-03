const TagServices = require('../services/tag-services')

const  verifytagisexists = async(ctx,next)=>{
    // 获取用户写的标签
    const  tagcontentarr = ctx.request.body.tagcontent
    const arr = []
    for(let name of tagcontentarr){
        const checkname = await TagServices.checktag(name)
       
        const tagobj = {name}
        if(checkname[0]){
            tagobj.id = checkname[0].id
        }else{
            const createtag = await TagServices.create(name)
            tagobj.id = createtag.insertId
        }
        arr.push(tagobj)
    }
    ctx.tags = arr

    await next();
}

module.exports = {
    verifytagisexists
}