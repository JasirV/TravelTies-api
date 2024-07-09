const {Server}=require('socket.io')
const http =require('http')
const express =require('express')

const app =express()
const server =http.createServer(app)
const io= new Server(server,{
    cors:{
        origin:"*"
    }
});

const userSocketMap={};

const getReceiverSocketId=(receiverId)=>{
    return userSocketMap[receiverId]
};

io.on('connection',(socket)=>{
    console.log('a user connected',socket.id);
    const userId=socket.handshake.query.userId
    if(userId!="umdefind")userSocketMap[userId]=socket.io

    io.emit('getOnlineUsers',Object.keys(userSocketMap))

    socket.on('disconnect',()=>{
        console.log('user disconnected',socket.id);
        delete userSocketMap[userId]
        io.emit('getOnlineUsers',Object.keys(userSocketMap))
    })
})

const sendNotification =(receiverIds,notification)=>{
    receiverIds.forEach(receiverId=>{
        const socketId=getReceiverSocketId(receiverId);
        if(socketId){
            io.to(socketId).emit('newNotification',notification)
        }
    })
}

module.exports={app,io,server,getReceiverSocketId,sendNotification}