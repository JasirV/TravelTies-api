function createError(message,name){
    const error=new Error(message)
    error.name=name
    return error
}

module.exports=createError