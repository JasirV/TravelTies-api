const mongoose=require('mongoose')

const notificationSchema=mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    receivedId:[
        {
            type:mongoose.Schema.Types.ObjectId
        }
    ],
    message:{
        type:String,
        required:true
    },
    user_see:{
        type:Boolean,
        default:false
    },createdAt:{
        type:Date,
        default:Date.now()
    }
})

const Notification=mongoose.model('notification',notificationSchema)
module.exports=Notification