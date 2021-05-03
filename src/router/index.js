const fs = require('fs')
const userouterFn = (app)=>{
    
    fs.readdirSync(__dirname).forEach(item=>{
        if (item === 'index.js') return ;
        const router = require(`./${item}`)
       
        app.use(router.routes())
        app.use(router.allowedMethods())
    })
}
module.exports = userouterFn