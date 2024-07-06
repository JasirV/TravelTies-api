const express=require('express')
const countrieRouter=express.Router()
const countriController=require('../controllers/countriesController')


countrieRouter.get('/',countriController.getCountries)


module.exports=countrieRouter