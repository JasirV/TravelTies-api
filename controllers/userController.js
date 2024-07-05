const User=require('../models/userSchema');
const getusers=async (req,res,next)=>{
    try {
        const {userId}=req.query
        let user;
        if(userId){
            user=await User.findById(userId)
        }else{
         user=await User.find().limit(10).sort({createdAt:-1});
        }
        if(!user){
            throw createError('Not finding users')
        }
        res.status(200).json({
            status:'success',
            message:'user fetching succes',
            data:user
        })
    } catch (error) {
        next(error)
        console.error("Get users in error is:",error.message);
    }
}

module.exports={getusers}