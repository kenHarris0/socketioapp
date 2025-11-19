import mongoose from "mongoose";

const schema=new mongoose.Schema({
    fullName:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    profilePic:{type:String,default:""}
},{timestamps:true})

 const User=mongoose.models.user || mongoose.model('user',schema)

export default User;