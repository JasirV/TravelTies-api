const Comment = require("../models/commentSchema");
const Post = require("../models/postSchema");
const createError = require("../utils/errorUtils");

const createComments=async (req,res,next)=>{
    try {
        const {comment,from,userId}=req.body
        const {postId} =req.params
        if(!comment){
            throw createError('Comment is required')
        }
        const newCommet=new Comment({
            comment,
            from,
            user_id:userId,
            post_id:postId
        })
        await newCommet.save()
        const post =await Post.findById(postId)
        post.comment.push(newCommet._id);
        const updatePost=await post.save()
        res.status(201).json(newCommet)
    } catch (error) {
        next(error)
        console.error(error);
    }
}
const replayComments=async (req,res,next)=>{
    try {
        const {userId}=req.body
        const {comment,replayAt,from}=req.body
        const {commentId}=req.params
        if(!comment){
            throw createError('commetn is requied')
        }
        const commentInfo=await Comment.findById(commentId);
        commentInfo.replies.push({
            comment,
            replayAt,
            from,
            user_id:userId,
        });
        commentInfo .save()
        res.status(200).json(commentInfo)
    } catch (error) {
        next(error)
        console.error(error);
    }
}
const getComments=async(req,res,next)=>{
    try {
        const {postId}=req.params;
        const postComments=await Comment.find({post_id:postId}).populate({path:"replies",populate:{path:"user_id",select:'first_name last_name profile_pic'}}).populate({path:'user_id',select:"first_name last_name profile_pic"}).sort({_id:-1})
        if(!postComments){
            throw createError("Something worng")
        }
        res.status(200).json({
            status:'success',
            message:'SuccessFuly fetch comments',
            data:postComments
        })
    } catch (error) {
        next(error)
        console.error(error);
    }
}
module.exports={createComments,replayComments,getComments}