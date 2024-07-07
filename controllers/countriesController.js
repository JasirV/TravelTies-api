const Conutires = require("../models/countriesSchema");
const createError = require("../utils/errorUtils");
const axios=require('axios')

const getCountries=async(req,res,next)=>{
    try {
         const {countriesCode}=req.query;
         console.log(req.query);
         let conutires ;
         if(countriesCode){
             conutires= await Conutires.find({name:countriesCode})
         }else{
            conutires= await Conutires.find()
         }
         if(!conutires||conutires.length<1){
            throw createError("some thing wen to worong")
         }
         res.status(200).json({
            status:'success',
            message:'cuntry Fetching successfully',
            data:conutires
         })
    } catch (error) {
        next(error)
        console.error(error);
    }
}

module.exports={getCountries}