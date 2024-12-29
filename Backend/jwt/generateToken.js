import jwt  from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


const createTokenandSaveCookie=(userId,res)=>{
  const token=jwt.sign({userId},process.env.JWT_TOKEN,{
      expiresIn: '10d'
  })
  console.log("Token generated= ",token)
  res.cookie("jwt",token,{
    httpOnly:true,
    secure:false,
    sameSite:"strict"
  })
}
export default createTokenandSaveCookie