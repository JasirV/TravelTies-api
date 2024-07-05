const Post = require('../models/postSchema')
const createError =require('../utils/errorUtils')

const createPost=async (req,res,next)=>{
try {
    const{user_id}=req.body
    const {description,image}=req.body
    if(!description){
        throw createError("You must provide a description")
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

const getPost=async(req,res,next)=>{
    try {
        const filter=req.query.filter
        const data=req.query.value
        const page =req.query.page||1
        const limit = 1
        const starting=(page-1)*limit
        const end=page*limit
        let posts
        let totalpage
        let totalLength
        let filterCriteria;
        if(data){
        totalLength =await Post.find()
        posts=await Post.find().limit(limit).skip(starting).sort(filterCriteria).populate('user_id')
        totalpage=Math.ceil(totalLength.length/limit);
        }else{
            totalLength =await Post.find({ status: data });
            posts=await Post.find({status:data}).limit(limit).skip(starting).sort(filterCriteria).populate('user_id')
            totalpage=Math.ceil(totalLength.length/limit);
        }
        if(!posts){
            throw createError('Error in Fetching Post error is')
        }
        return res.status(200).json({
            status:'success',
            message:'successfully fetch data',
            data:posts,
            totalpage
        })

    } catch (error) {
        next(error)
        console.error(error);
    }
}
const likePost=async(req,res,next)=>{
    try {
    const {userId}=req.body
    const {postId}=req.params;
    const post=await Post.findById(postId)
    if(!post){
        throw createError("Something went to wrong post not get")
    }if(post.likes.includes(userId)){
        throw createError ('User has already like this post')
    }
    const index =Post.likes.findIndex((ui)=>String(ui)===String(userId))
    if(index===-1){
        post.likes.push(userId)
    }else{
        post.likes=post.likes.filter((pl)=>String(pl)!==String(userId))
    }
    const updatedPost=await Post.findByIdAndUpdate(
        postId,{like:post.likes},
        {new:true}
    )
    res.status(200).json({
        status:'success',
        message:'Pot Liked?uliked successfully',
        data:updatedPost
    })
    } catch (error) {
        next(error)
        console.error(error);
    }
    
}

module.exports={createPost,getPost,likePost}