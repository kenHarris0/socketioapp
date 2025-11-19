import User from "../models/User.js"
import bcrypt from "bcryptjs"
import { generateToken } from "../lib/utils.js"
import {transporter} from '../emails/emailHandler.js'
import {createWelcomeEmailTemplate} from '../emails/emailTemplate.js'
import {ENV} from '../lib/env.js'
import cloudinary from "../lib/cloudinary.js"

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
try{
   let emailObj={
    from:process.env.SMTP_MAIL,
    to:newuser.email,
    subject:"Welcome to chatapp",
    html:createWelcomeEmailTemplate(newuser.fullName,ENV.CLIENT_URL)
   }
   transporter.sendMail(emailObj)
   console.log("email sent")
}
catch(err){
        console.log(err)
       
    }
await  newuser.save()
 res.status(201).json({
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

export const login=async(req,res)=>{
    const {email,password}=req.body

    try{
        const user=await User.findOne({email})
        if(!user){
            return res.status(400).json({message:"invalid credentials"})
        }
        const checkpswd=await bcrypt.compare(password,user.password)
        if(!checkpswd){
             return res.status(400).json({message:"invalid credentials"})
        }
        generateToken(user._id,res)
        res.status(200).json({
             _id:user._id,
    fullName:user.fullName,
    email:user.email,
    profilePic:user.profilePic

        })

    }
    catch(err){
        console.log(err)
        res.status(500).json({message:"error in login controller"})
    }
}

export const logout=async(req,res)=>{
    res.cookie("jwt","",{
        maxAge:0
    })
    res.status(200).json({message:"logged out successfully"})
}

export const updateProfile=async(req,res)=>{
    try{
        const {profilePic}=req.body
        if(!profilePic){
             return res.status(400).json({message:"no photo sent"})
        }

        const userId=req.user._id;
       const uploadResponse= await cloudinary.uploader.upload(profilePic);
       const updatedUser=await User.findByIdAndUpdate(userId,{profilePic:uploadResponse.secure_url},{new:true});

       res.status(200).json(updatedUser)



    }
    catch(err){
console.log(err)
    }
}