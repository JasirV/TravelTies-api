const express=require('express')
const userRouter=express.Router()
const userController=require('../controllers/userController')


userRouter.get('/',userController.getusers)
.put('/',userController.updateUser)
.patch('/:userId/',userController.updateCountries)
  
 
module.exports=userRouter    