const config = require('config')

const app = require('./app')
const port = config.get('PORT')

app.listen(port, ()=>{
    console.log("Port is open on:" + port)
})


