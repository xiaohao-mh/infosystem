const connection = require('../app/database.js')

class Userservices{
    async create(user){
        // 对拿到的数据进行解构
        const { name , password } = user
       
        // 要进行操作的数据
        const statement = `INSERT INTO user (name,password) VALUES (?,?);`;
       
        const result = await connection.execute(statement,[name,password])

        return result
    }
    async verify(name){
    
        // 要进行操作的数据
        const statement = `SELECT * from user where name = ?;`;

        const result = await connection.execute(statement,[name])
        
        return result
    }
}
module.exports = new Userservices()