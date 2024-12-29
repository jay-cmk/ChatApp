import mongoose from 'mongoose';
import dotenv from "dotenv";
dotenv.config();
const url=process.env.DATABASEURL


const dbconnect=()=>{
   mongoose.connect(url).then(()=>{
      console.log('MONGO_URI:', url);

    console.log("db conncetion successfully")
   })
   .catch((error)=>{
    console.log("not connection establish",error) 
   })

}
export default dbconnect;