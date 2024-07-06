const mongoose =require('mongoose')
const Schema=mongoose.Schema;
const PostSchema=new Schema({
    user_id:{
        type:Schema.Types.ObjectId,ref:'user'
    },
    description:{
        type:String,require:true
    },
    image:{
        type:String
    },
    like:[
        {type:String}
    ],
    comment:[
        {type:Schema.Types.ObjectId,ref:'comment'}
    ],
    location:{
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
},
{timestamps:true}
)

const Post=mongoose.model('post',PostSchema)
module.exports=Post