import {Server} from 'socket.io'

import http from 'http'
import express from 'express'

const app = express();

const server=http.createServer(app);
const io=new Server(server,{
    cors:{
        origin: "http://localhost:3001",
        methods: ["GET", "POST"],
        credentials: true,
    }
})
// realtime  message code here
export const getReceiverSocketId=(receiverId)=>{
  return users[receiverId]
}

const users={}
// used to listen events on server side
io.on("connection",(socket)=>{
    console.log("a user are connected",socket.id);

    const userId=socket.handshake.query.userId
    if(userId){
        users[userId]=socket.id
        console.log(users)
    }

    // used to send the event to all user
    io.emit("getOnlineUsers",Object.keys(users))
    // used to listen client side events emmited by server side (server and client)
    socket.on("disconnected",()=>{
        console.log("a user disconnected",socket.id)
        delete users[userId]
        io.emit("getOnlineUsers",Object.keys(users))
    })
    
})  

export {app,io,server}