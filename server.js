const dotenv=require('dotenv')
dotenv.config({path:'./.env'})
const app=require('./app')
const connectDB=require('./config/config')


const port=process.env.PORT
connectDB()


app.listen(port,()=>{
    console.log(`server runnig port no :${port}`);
})