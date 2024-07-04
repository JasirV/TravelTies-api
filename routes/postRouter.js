const express=require('express')
const postRouter=express.Router();
const postController=require('../controllers/postController')

postRouter.post('/',postController.createPost)

module.exports=postRouter