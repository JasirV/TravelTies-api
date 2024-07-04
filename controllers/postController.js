const Post = require('../models/postSchema')
const createError =require('../utils/errorUtils')

const createPost=async (req,res,next)=>{
try {
    const{user_id}=req.body
    const {description,image}=req.body
    if(!description){
        throw createError("You must provide a description")
        return 
    }
    const post =await Post.create({
        user_id,
        description,
        image
    })
    res.status(200).json({
        status:'success',
        message:'Post created successfully',
        data:post
    })
} catch (error) {
    next(error);
    console.error("Error is creatPosting",error.message);
}
}


module.exports={createPost}