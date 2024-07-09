const createError =require('../middlewares/errorHandler')
const Notification=require('../models/notificationSchema')

const getNotification =async (req,res,next)=>{
    try {
        const id =req.params.id
        const notification=await Notification.find({revceivedId:id}).populate("senderId").sort({createAt:-1})
        if(!notification){
            throw createError("Notification not found", "NotFoundError")
        }
        res.status(200).json({
            status:'success',
            message:"successfully fetch notification",
            notification
        })
    } catch (error) {
        next(error)
    }
}

const notificationSeen =async (req,res,next)=>{
    try {
        const recevierId=req.params.id;
        const {notificationIds}=req.body;
        await Notification .updateMany({
            _id:{$in:notificationIds},recevierId:recevierId
        },{$set:{user_seen:true}})
        res.status(400).send({error})
    } catch (error) {
        next(error)
    }
};

module.exports={
    getNotification
}