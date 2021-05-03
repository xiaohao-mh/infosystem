
const services = require("../services/comment-services")
class commentController{
    async create(ctx,next){
        console.log('laidaole');
        const {  id  } = ctx.user
        // momentid 是记录用户对数据库哪一条动态进行评论
        const {momentid,content} = ctx.request.body
        const result = await services.createComment(id,momentid,content)
        
        ctx.body = result
    }
    async reply(ctx,next){
        const {  id  } = ctx.user
        // 对于评论的回复
        const commentid = ctx.params.id
        // 对评论回复的内容 momentid 是记录用户对数据库哪一条动态进行评论
        const {momentid,content} = ctx.request.body

        console.log(id,momentid,content,commentid);

        const result = await services.reply(id,momentid,content,commentid)

        ctx.body = result
    }
    async update(ctx,next){
       // 要修改的评论id
        const    id = ctx.params.commentid
     
        const {  content } = ctx.request.body
    
        const result = await services.update(id,content)
        ctx.body = result
    }
    async commentRemove(ctx,next){
        const {commentid} = ctx.params
        const result = await  services.remove(commentid)
        ctx.body = result
    }
    async momentidgetcomment(ctx,next){
        const momentid = ctx.query.momentid
        const result = await services.correspondingComment(momentid)
        ctx.body = result 
    }
}

module.exports = new commentController()