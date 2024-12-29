import mongoose from 'mongoose';
const userSchema=mongoose.Schema({
    fullname:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        unique:true
    },
    confirmpassword:{
        type:String,
        required:true,
        unique:true
    }

},{timesstamps:true}) //createAt & updateAt

const User = mongoose.model('User', userSchema);

export default User;