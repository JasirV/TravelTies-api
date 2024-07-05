const express=require('express')
const app =express()
const cors=require('cors')
const authRouter = require('./routes/authRouter')
const postRouter = require('./routes/postRouter')
const commentRouter = require('./routes/commentRouter')
const userRouter = require('./routes/userRouter')

app.use(cors())
app.use(express.json())

app.use('/api/auth/',authRouter)
app.use('/api/post/',postRouter)
app.use('/api/comments/',commentRouter)
app.use('/api/users/',userRouter)

module.exports=app; 