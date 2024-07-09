const dotenv=require('dotenv')
dotenv.config({path:'./.env'})
const app=require('./app')
const connectDB=require('./config/config')
const { server } = require('./socket/socket')

const port=process.env.PORT
connectDB()


server.listen(port,()=>{
    console.log(`server runnig port no :${port}`);
})