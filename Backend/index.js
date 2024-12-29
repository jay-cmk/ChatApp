import express from 'express';
import dotenv from "dotenv";
import cors from 'cors';
dotenv.config();
import path from 'path'
// const app=express();
import {app,server} from './socket/server.js'
import cookieParser from 'cookie-parser';
app.use(express.urlencoded({ extended: true }));
import userRout from './routes/user.route.js';
import messageRoute from './routes/message.route.js'
import connectDB from './Database/database.js';

app.use(cors());

// middleware
app.use(cookieParser())
app.use(express.json());
const PORT = process.env.PORT || 3000;


app.use('/api/user',userRout)
app.use('/api/message',messageRoute)
// app.get("/",(req,res)=>{
//     res.send("helloo world")
// })

// ............code for deploy..........
if(process.env.NODE_ENV=== "production"){
    const dirPath=path.resolve()
 
 app.use(express.static("./Frontend/dist"))
 app.get("*",(req,res)=>{
   res.sendFile(path.resolve(dirPath,"./Frontend/dist","index.html"))
 })
 }


server.listen(PORT,()=>{ 
    connectDB();    
    console.log(`server start at ${PORT}`)

})

