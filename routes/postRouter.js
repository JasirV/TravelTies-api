const express=require('express')
const postRouter=express.Router();
const postController=require('../controllers/postController');
const { verifyToken } = require('../middlewares/verificationToken');

postRouter.post('/',verifyToken,postController.createPost)
.get('/',postController.getPost)
.post('/:postId',postController.likePost)
.delete('/:postId',verifyToken,postController.deletePost)
module.exports=postRouter