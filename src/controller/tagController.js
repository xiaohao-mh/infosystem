
const TagServices = require('../services/tag-services.js')

class tagController{
    async createTag(ctx,next){
      
        const { tagname }= ctx.request.body
        
        const result = await TagServices.create(tagname)
        ctx.body = result
    }
    async gettaglist(ctx,next){
        const {limit,offset} = ctx.query
        const result = await TagServices.getlist(limit,offset)
        ctx.body = result
    }
}

module.exports = new tagController()