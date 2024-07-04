const express=require('express')
const authRouter=express.Router();
const userController=require('../controllers/authControllers')
authRouter.post('/register',userController.registerUser)
.post('/login',userController.loginUser)

module.exports =authRouter