const express = require('express')
require('./db/mongoose')
const userRouter = require('./routes/user')
const wineRouter = require('./routes/wines')

const app = express()


app.use(express.json())
app.use(userRouter)
app.use(wineRouter)

module.exports = app
