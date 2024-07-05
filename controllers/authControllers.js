const User=require('../models/userSchema');
const createError = require('../utils/errorUtils');
const { generateToken, hashing } = require('../utils/generateToken');
const bcrypt =require('bcrypt')

const registerUser=async(req,res,next)=>{
    try {
        const {first_name,last_name,email,password}=req.body
        const existingUser= await User.findOne({email});
        if(existingUser){
            throw new Error('Email alrady exists')
        }
        
        const hashPassword=await hashing(password)
        console.log(hashPassword);
        const datas={
            first_name,
            last_name,
            email,
            password:hashPassword

        }
        const user=new User(datas)
        await user.save() 
        if(user){
            const token= generateToken(user._id)
            res.status(201).json({ 
                status:'success',
                message:"successfully create user",
                user, 
                token
            }) 
        }
    } catch (error) {
        console.error('Error registering user:',error);
        if(error.message=="Email or User Name alrady exists"){
            throw createError('Email Or User Name alredy exusts',"validation Error")
        }
        next(error);
            console.error(error.message);
        
    }
}

const loginUser=async(req,res,next)=>{
    try {
        console.log(req.body);
        const {email,password}=req.body;
        const user=await User.findOne({email});
        if(!user){
            throw createError('User Not Fount','validationerror')
        }
        const matchPassword=await bcrypt.compare(password,user.password);
        if(!matchPassword){
            throw createError('Incorrect password')
        }
        const token=generateToken(user._id)
        res.status(200).json({
            status:'success',
            message:'Login successfully',
            token,
            user 
        })
    } catch (error) {
        next(error)
        console.error('Error logging ',error.message)
    }
}



module.exports={registerUser,loginUser}