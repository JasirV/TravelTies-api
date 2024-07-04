const express=require('express')
const app =express()
const cors=require('cors')
const authRouter = require('./routes/authRouter')

app.use(cors())
app.use(express.json())

app.use('/api/auth/',authRouter)

module.exports=app;