const express=require('express')
const commentRouter=express.Router()
const commentController=require('../controllers/commentsController')
const { verifyToken } = require('../middlewares/verificationToken')

commentRouter.post('/:postId/',verifyToken,commentController.createComments)
.get('/:postId/',verifyToken,commentController.getComments) 
.post('/replayComment/:commentId',verifyToken,commentController.replayComments)

module.exports=commentRouter