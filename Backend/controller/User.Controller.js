import User from '../Model/user.model.js'; // Import the User model
import bcrypt, { compare } from 'bcrypt';
import createTokenandSaveCookie from '../jwt/generateToken.js';

export const signup = async (req, res) => {

  console.log("signup")
  const { fullname, email, password, confirmpassword } = req.body;
  console.log("Received request body:", req.body);

  if (password !== confirmpassword) {
    console.log("reach here ",password," ",confirmpassword)
    return res.status(400).json({ error: "Passwords do not match" });
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already registered" });
    }
    const saltRounds = 10; 
    const hashPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({
      fullname,
      email,
      password: hashPassword,
      confirmpassword
    });

    await newUser.save();
    if (newUser) {
      createTokenandSaveCookie(newUser._id, res);
    }
    res.status(201).json({ message: "User created successfully", newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// LOg in start here
export const login=async(req,res)=>{
  const {email,password}=req.body;
  try{
   
    const user=await User.findOne({email});
    const isMatch=await compare(password,user.password);
    if(!user || !isMatch){
      return res.status(400).json({error:"invalid user credential"})
    }
    createTokenandSaveCookie(user._id,res);
    res.status(200).json({message:"user logged in success",user:{
      _id:user._id,
      fullname:user.fullname,
      email:user.email

    }})
  }
  catch(err){
     console.log("error",err)
     res.status(500).json({message:"enternal server error"})
  }
}
// log out 
export const logout=async(req,res)=>{
   try{
      res.clearCookie('jwt');
      res.status(200).json({message:"user logged out success"});
   }
   catch(err){
    res.status(500).json({message:"enternal server error"})

   }
}

// get all users
export const allUsers=async (req,res)=>{
      console.log("id = ",req.user.email)
  try{
    const loggedInUser=req.user._id;
    const filteredUser=await User.find({_id:{$ne:loggedInUser}}).select("-password");
    res.status(201).json(filteredUser)
    console.log("passed from controler")
  }
  catch(error){
      console.log("could not fetch all users",error)
  }
}
