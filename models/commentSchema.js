const mongoose =require('mongoose')
const Schema=mongoose.Schema




const ReplySchema=new Schema({
    rid:{
        type:Schema.Types.ObjectId
    },
    user_id:{
        type:Schema.Types.ObjectId,ref:"user"
    },
    from:{
        type:String
    },
    replayAt:{
        type:String
    },
    comment:{
        type:String
    },
    created_at:{
        type:Date,default:Date.now()
    },
    update_at:{
        type:Date,default:Date.now()
    },
    likes:[
        {type:String}
    ]
})
const CommentSchema=new Schema({
    user_id:{
        type:Schema.Types.ObjectId,ref:'user'
    },
    post_id:{
        type:Schema.Types.ObjectId,ref:'post'
    },
    comment:{
        type:String,require:true
    },
    from:{
        type:String ,require:true
    },
    replies:[
        ReplySchema
    ],
    likes:[{
        type:String
    }]
},
{timestamps:true}
);

const Comment=mongoose.model('comment',CommentSchema)
module.exports=Comment