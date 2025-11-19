import User from "../models/User.js"
import bcrypt from "bcryptjs"
import { generateToken } from "../lib/utils.js"




export const signup=async(req,res)=>{
    const {fullName,email,password}=req.body
    try{
        if(!fullName || !email || !password){
            return res.status(400).json({message:"all fields required"})
        }
        if(password.length<6){
            return res.status(400).json({message:"password min 6 chars"})
        }
       const emailregex=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/
       if(!emailregex.test(email)){
        return res.status(400).json({message:"invalid email format"})
       }
const user= await User.findOne({email});
if(user){
    return res.status(400).json({message:"please login"})
}

const salt=await bcrypt.genSalt(10)

const hashpswd=await bcrypt.hash(password,salt);
const newuser=new User({
    fullName,email,password:hashpswd
})
if(newuser){
generateToken(newuser._id,res);
await  newuser.save()
 return res.status(201).json({
    _id:newuser._id,
    fullName:newuser.fullName,
    email:newuser.email,
    profilePic:newuser.profilePic
 })
}
else{
     return res.status(400).json({message:"invalid userdata"})
}


       


    }
    catch(err){
        console.log(err)
        res.status(500).json({message:"internal server error"})
    }

}