const mongoose = require('mongoose')
const config = require('config')
const db = config.get('MONGODB_URL')

mongoose.connect(db, {
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false,
})














