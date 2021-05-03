
const { check } = require('../services/moment-services')
const Momentservices = require('../services/moment-services')
const fs = require("fs")
// const { APP_PORT, HOST} = require('../app/config')
const {PICTURE_PATH} = require("../constants/filepath")
class momentController{
    async create(ctx,next){
     
        const user_id = ctx.user.id
        const {content} = ctx.request.body
      
        // 插入数据库
        const result =await Momentservices.create(content,user_id)

        ctx.body = result

    }
    async getUserMoment(ctx,next){
        // 拿到user的id
        const user_id = ctx.params.momentid
        
        // 插入数据库
        const result =await Momentservices.getOneUserMoment(user_id)
        ctx.body = result
    }
    async getUserMoments(ctx,next){

        const {offset,limit} = ctx.query
        
        const result =await Momentservices.getManyUserMoment(offset,limit)
        
        ctx.body = result
    }
    async update(ctx,next){

        const momentid = ctx.params.mmid
        const {content} = ctx.request.body
        const result = await Momentservices.updateContent(momentid,content)
        ctx.body = result
    }
    async remove(ctx,next){

        const momentid = ctx.params.mmid
        const result = await Momentservices.removeContent(momentid)

        ctx.body = result
    }
    async addtags(ctx,next){
         
        const {  tags  }   = ctx
        const { momentid  } =  ctx.params
      
        for(let tagname of tags){
            const { id }  = tagname
            const checkresult = await Momentservices.check(momentid,id)
            
            if(!checkresult[0]){
              await Momentservices.createtagname(momentid,id)
            }
            
        }
  
        ctx.body = '成功'
    }
    async getpicture(ctx,next){
       
        // http://localhost:8000/moment/pictures/b1414355467a80a0c95c341cfd66b814
        // 获取图片信息
        let { infos } = ctx.params
        // 去服务器查找图片
        const result = await Momentservices.getimages(infos)
        const { type } = ctx.query
        const types = ['small','big','middle']
        if(types.some(item => item === type)){
            infos = infos + '-'+ type
        }
       
        ctx.response.set('content-type',result.mimetype)
        ctx.body = fs.createReadStream(`${PICTURE_PATH}/${infos}`) 


    }
}

module.exports = new momentController()