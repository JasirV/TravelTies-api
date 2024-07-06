const User=require('../models/userSchema');
const createError = require('../utils/errorUtils');
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

const updateUser=async(req,res,next)=>{
    try {
        console.log(req.body);
        const {userId}=req.body
        console.log(userId,'hiii')
        const user=await User.findById(userId)
        if(!user){
            throw createError('User not found ')
        }
        const update=await User.findByIdAndUpdate(userId,req.body,{new:true})
        if(!update){
            throw createError("something went to wrong")
        }

        res.status(200).json({
            status:'success',
            message:'User update successfuly',
            update
        })
    } catch (error) {
        next(error)
        console.error(error);
    }
}
const updateCountries=async(req,res,next)=>{
    try {
        const {selected}=req.body
        const {userId}=req.params
        if(!userId){
            throw createError('User id not found ')
        }
        const user=await User.findById(userId)
        if(!user){
            throw createError('User Not found')
        }
        const updatedUser = await User.findByIdAndUpdate(userId,{$addToSet:{interested_countries:{$each:selected}}},{new:true});
        if(!updatedUser){
            throw createError('something went to wrong')
        }
        res.status(200).json({
            status:'success',
            message:'update Countries',
            data:updatedUser 
        })
    } catch (error) {
        next(error)
        console.log(error);
    }
}

module.exports={getusers,updateUser,updateCountries}