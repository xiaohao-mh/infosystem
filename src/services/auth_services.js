const connection = require('../app/database.js')
class authServices{
    async checkTable(checkname,momentid,id){
        const statement =  `select * from ${checkname} where id = ? and user_id = ?;`
        const result = await connection.execute(statement,[momentid,id])
        
        return result[0].length ===0 ? false:true
    }

}
module.exports = new authServices()