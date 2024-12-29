import jwt from 'jsonwebtoken'
import User from '../Model/user.model.js'
import dotenv from "dotenv";
dotenv.config();


const secureRoute=async(req,res,next)=>{
  try{
    console.log("Cookies in request:", req.cookies);
    const token = req.cookies.jwt;
    console.log("token secure route= ",token)
    if(!token){
        return res.status(401).json({error:"No token ,authorize denied"})
      }
      const decode=jwt.verify(token,process.env.JWT_TOKEN)
      if(!decode){
        return res.status(401).json({error:"invalid token"})
      }
      const user=await User.findById(decode.userId).select("-password")
      if(!user){
        return res.status(401).json({error:"no user Found"})
      }
      req.user=user;
      next();
      console.log("passed from here")
  }
  catch(error){
    console.log("error in Secure Route:",error)
    res.status(500).json({error:"internal server error"})
  }
}

export default secureRoute