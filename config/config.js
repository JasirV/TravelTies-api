const mongoose=require('mongoose')


const connectDB=async function(){
    try {
       await mongoose.connect(process.env.DB_URL,{dbName:'TravelCommunityFeedApplication'})
       console.log("DB Connected Successfully");
    
    } catch (error) {
        console.log('error commection in db',error);
    }
}

module.exports=connectDB;