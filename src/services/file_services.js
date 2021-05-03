const connection = require('../app/database.js')
class fileServices{
    async createfile(filename,mimetype,size,id){
        const statement =  `insert into upload (filename,mimetype,size,user_id) VALUES (?,?,?,?);`
        const result = await connection.execute(statement,[filename,mimetype,size,id])
        return result
    }
    async getAvatar(id){
        const statement  = `select * from upload where user_id = ?;`
        const  [result] = await connection.execute(statement,[id])
        return result[0]
    }
    async saveavatarurl(avatar_url,id){
        const statement =`UPDATE  user SET avatar_url = ? where id = ?;`
        const result = await connection.execute(statement,[avatar_url,id])
        return result[0]
    }
    async savepicture(filename,mimetype,size,id,momentid){
        const statement = `insert into file  (filename,mimetype,size,user_id,moment_id) VALUES (?,?,?,?,?);`
        const result = await connection.execute(statement,[filename,mimetype,size,id,momentid])
      
        return result[0]
    }
}
module.exports = new fileServices()