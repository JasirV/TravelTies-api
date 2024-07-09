const Post = require('../models/postSchema')
const createError =require('../utils/errorUtils')
const Notification =require('../models/notificationSchema')
const User=require('../models/userSchema')
const { sendNotification } = require('../socket/socket')
const createPost=async (req,res,next)=>{
try {
    const{user_id}=req.body
    const {description,image,selectLocation}=req.body
    if(!description){
        throw createError("You must provide a description")
    }
    const post =await Post.create({
        user_id,
        description,
        location:selectLocation,
        image
    })
    const user=await User.findById(user_id)
    const receivedData = await User.find({ _id: user_id }, { _id: 0 });
    const notificationData={
        senderId:user_id,
        receivedId:receivedData,
        message:`New Post ${user.first_name,user.last_name}`
    }
    const newNotification =new Notification(notificationData)
    const savedNotification=await newNotification.save()
    console.log(sendNotification,'find picode');
    sendNotification(receivedData,savedNotification)
    if(post){
        throw createError('Something went wrong',"validationError")
    }
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
        console.log(req.query);
        const filter=req.query.filter
        const data=req.query.search
        const page =req.query.page||1
        const limit = 5
        const starting=(page-1)*limit
        const end=page*limit
        let posts
        let totalpage
        let totalLength
        let filterCriteria;
        let sortCriteria; 
        if(data){
            filterCriteria = { $or: [{ description: new RegExp(data, 'i') }, { location: new RegExp(data, 'i') }] };
        }else if(filter){
        switch (filter) {
        case 'dfl':
        sortCriteria = { createdAt: 1 };
        break;
        case 'dlf':
        sortCriteria = { createdAt: -1 };
        break;
        default:
        sortCriteria = { createdAt: -1 };
        break;
        }
        }
        if(filterCriteria||sortCriteria){
        totalLength =await Post.find(filterCriteria)
        posts=await Post.find(filterCriteria).limit(limit).skip(starting).sort(sortCriteria).populate('user_id')
        totalpage=Math.ceil(totalLength.length/limit);
        }else{
            totalLength=await Post.find()
            posts=await Post.find().limit(limit).skip(starting).populate('user_id')
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
    const user=await User.findById(userId)
    const receivedData = await User.find({ _id: post.user_id });
    const notificationData={
        senderId:userId,
        receivedId:receivedData,
        message:`like Post  ${user.first_name,user.last_name}`
    }
    const newNotification =new Notification(notificationData)
    const savedNotification=await newNotification.save()
    console.log(sendNotification,'find picode');
    sendNotification(receivedData,savedNotification)
    if(post){
        throw createError('Something went wrong',"validationError")
    }
    if(!post){
        throw createError("Something went to wrong post not get")
    }const isLiked=post.like.includes(userId);
    if(isLiked){
        post.like=post.like.filter((pl)=>String(pl)!==String(userId))
    }else{
        post.like.push(userId)
    }
    const updatedPost=await Post.findByIdAndUpdate(
        postId,{like:post.like},
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
const deletePost=async (req,res,next)=>{
    const {postId}=req.params;
    const deleted=await Post.findByIdAndDelete(postId)
    if(!deleted){
        throw createError('somthing went to worong ')
    }
    return res.status(200).json({
        status:'success',
        message:'successfully Deleted'
    })
}

module.exports={createPost,getPost,likePost,deletePost}