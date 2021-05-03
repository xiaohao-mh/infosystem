const connection = require('../app/database.js')

class TagServices{
    async create(tagname){
   
        const statement =  `INSERT INTO tag (name) VALUES (?);`
        const result = await connection.execute(statement,[tagname])
      
        return result[0]
    }
    async checktag(tagname){
        const  statement = `select * from tag where name = ?;`
        
        const result = await connection.execute(statement,[tagname])
        
        return result[0]
    }
    async getlist(limit,offset){
        const statement = `select * from tag limit ?,?;`
        const result = await connection.execute(statement,[offset,limit])
        return result[0]
    }
}
module.exports = new TagServices()