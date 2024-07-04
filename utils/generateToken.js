const jwt =require('jsonwebtoken')
const bcrypt=require('bcrypt')

const hashing=async(value)=>{
    const salt=await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(value,salt)
    return hashedPassword
}

const generateToken=(id)=>{
try {
    const token =jwt.sign({id:id},process.env.TOKEN_SECRET,{
        expiresIn:"1d"
    })
    return token
} catch (error) {
    console.error('error genreating token ',error);
    return null
}
}

module.exports={generateToken,hashing}