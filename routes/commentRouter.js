const express=require('express')
const commentRouter=express.Router()
const commentController=require('../controllers/commentsController')
const { verifyToken } = require('../middlewares/verificationToken')

commentRouter.post('/:postId/',commentController.createComments)
.get('/:postId/',commentController.getComments) 
.post('/replayComment/:commentId',commentController.replayComments)

module.exports=commentRouter