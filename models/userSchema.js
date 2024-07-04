const mongoose=require('mongoose')
const bcrypt=require('bcrypt')

const userSchema=mongoose.Schema({
    first_name:{
        type:String,
        require:true
    },
    last_name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique: true 
    },
    profile_pic:{
        type:String,
        require:false
    },
    interested_countries:{
        type: [String],
        require:false
    },
    password:{
        type:String,
        min:8,
        require:true
    }
})


const user=mongoose.model('user',userSchema);
module.exports=user;