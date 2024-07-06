const express=require('express')
const app =express()
const cors=require('cors')
const authRouter = require('./routes/authRouter')
const postRouter = require('./routes/postRouter')
const commentRouter = require('./routes/commentRouter')
const userRouter = require('./routes/userRouter')
const bodyParser=require('body-parser')
const morgan = require('morgan')
const countrieRouter = require('./routes/countriesRouter')

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use('/api/auth/',authRouter)
app.use('/api/post/',postRouter)
app.use('/api/comments/',commentRouter) 
app.use('/api/users/',userRouter)
app.use('/api/countries/',countrieRouter)

module.exports=app; 