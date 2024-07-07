const express=require('express')
const userRouter=express.Router()
const userController=require('../controllers/userController')
const { verifyToken } = require('../middlewares/verificationToken')


userRouter.get('/',userController.getusers)
.put('/',verifyToken,userController.updateUser)
.patch('/:userId/',verifyToken,userController.updateCountries)
  
 
module.exports=userRouter     