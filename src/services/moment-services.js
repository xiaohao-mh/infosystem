const connection = require('../app/database.js')

class Momentservices{
    async create(content,user_id){
        const statement = `INSERT INTO moment (content,user_id) VALUES (?,?);`;
       
        const result = await connection.execute(statement,[content,user_id])

        return result
    }
    async getOneUserMoment(id){
        const statement =  `SELECT m.id id,m.content content,m.createAt createTime,m.updateAt updateTime,

                JSON_OBJECT("id",u.id,"name",u.name,'avatarUrl',u.avatar_url) user,
                
                (SELECT IF(COUNT(c.id),JSON_ARRAYAGG(
                                JSON_OBJECT('id',c.id,'content',c.content,'commentid',c.comment_id,			     'createTime',c.createAt,
                                'comment-user',JSON_OBJECT('user',mu.id,'name',mu.name,'avatarUrl',mu.avatar_url) )
                ) ,NULL) from comment c left JOIN user mu ON mu.id = c.user_id where m.id = c.moment_id) commentinfo,
                IF(count(l.id),JSON_ARRAYAGG(JSON_OBJECT('id',l.id,'name',l.name)),NULL) tags,
                (select  JSON_ARRAYAGG(CONCAT('http://localhost:8000/moment/pictures/',f.filename)) 
                from file  f where f.moment_id = m.id) picturesinfo
        FROM moment m
        LEFT JOIN user u ON m.user_id = u.id 


        left JOIN tag_moment ml ON m.id = ml.moment_id
        LEFT JOIN tag l ON ml.tag_id = l.id 

        where m.id = ?
        GROUP BY m.id;
`
        const result = await connection.execute(statement,[id])
        return result[0]
    }
    async getManyUserMoment(offset,limit){
        const statement = `SELECT m.id id,m.content content,m.createAt createTime,m.updateAt updateTime,
        JSON_OBJECT("id",u.id,"name",u.name,'avaurl',u.avatar_url) user,
				(SELECT COUNT(*) FROM comment c WHERE c.moment_id = m.id) commentCount,
                (SELECT COUNT(*) FROM tag_moment tm where tm.moment_id = m.id) tagCountls,
                (select  JSON_ARRAYAGG(CONCAT('http://localhost:8000/moment/pictures/',f.filename)) 
                from file  f where f.moment_id = m.id) picturesinfo
        FROM moment m
        LEFT JOIN user u 
        ON m.user_id = u.id LIMIT ?,?;`
        const result = await connection.execute(statement,[offset,limit])
        return result[0] 
    }
    async updateContent(momentid,content){
        const statement = `UPDATE moment SET content = ? WHERE id =?;`
      
        const result = await connection.execute(statement,[content,momentid])
        return result[0] 
    }
    async removeContent(momentid){
        const statement =  `delete from moment where id = ?;`
        const result = await connection.execute(statement,[momentid])
        return result[0]
    }
    async check(momentid,id){
        const statement = `select * from tag_moment where tag_id = ? and moment_id = ?;`
        const result = await connection.execute(statement,[id,momentid])
        
        return result[0]
    }
    async createtagname(momentid,id){
    
        const statement = `INSERT INTO tag_moment (tag_id,moment_id) VALUES (?,?);`
        const result = await connection.execute(statement,[id,momentid])
        
        return result
    }
    async getimages(infos){
        const statement = `select * from file where filename = ?;`
        const [result] = await connection.execute(statement,[infos])
        return result[0]
    }
}
module.exports = new Momentservices()