const connection = require('../app/database.js')

class commentServices{
   async createComment(id,momentid,content){
      const statement = `INSERT INTO comment (content,user_id,moment_id) VALUE (?,?,?);`
      const result = await connection.execute(statement,[content,id,momentid])
      return result[0]
   }
   async reply(id,momentid,content,commentid){
      const statement =  `INSERT INTO comment (content,user_id,moment_id,comment_id) VALUE (?,?,?,?);`
      
      const result = await connection.execute(statement,[content,id,momentid,commentid])
     
      return result[0]
   }
   async update(id,content){
      const statement =`UPDATE  comment SET content = ? where id =?;`
      const result = await connection.execute(statement,[content,id])
      return result[0]
   }
   async remove(id){
      const statement = `DELETE from comment WHERE id = ?;`
      const result = await connection.execute(statement,[id])
      return result[0]
   }
   async correspondingComment(momentid){
      const statement = `
      SELECT c.id, c.content,c.comment_id commentid , c.createAt createTime,
            JSON_OBJECT('id',u.id,'name',u.name) user
      FROM comment c LEFT JOIN user u ON  u.id = c.user_id WHERE moment_id = ?;
      `
      const result = await connection.execute(statement,[momentid])
      return result[0]
   }
}
module.exports = new commentServices()