const express=require('express')
const app =express()
const cors=require('cors')
const authRouter = require('./routes/authRouter')
const postRouter = require('./routes/postRouter')

app.use(cors())
app.use(express.json())

app.use('/api/auth/',authRouter)
app.use('/api/post/',postRouter)

module.exports=app;