const mongoose=require('mongoose')
const Schema=mongoose.Schema;

const conutries= new Schema({
    code:{
        type:String
    },
    name:{
        type:String
    },
    img:{
        type:String
    }
})

const Conutires=mongoose.model("conutires",conutries)
module.exports=Conutires