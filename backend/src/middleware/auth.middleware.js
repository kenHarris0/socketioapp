import jwt from "jsonwebtoken"
import User from "../models/User.js"
import { ENV } from "../lib/env.js"

export const protectRoute=async(req,res,next)=>{
try{
    const token=req.cookies.jwt
    if(!token){
        return res.status(401).json({message:"unauth no token found"})
    }

    const vrfy=jwt.verify(token,ENV.JWT_SECRET)
    if(!vrfy){
        return res.status(401).json({message:"unauth no token found"})
    }

    const user=await User.findById(vrfy.userId).select("-password")
    if(!user){
        return res.status(401).json({message:"no user found"})
    }
    req.user=user;
    next()

}
catch(err){
return res.status(500).json({message:"auth failed"})
}
}