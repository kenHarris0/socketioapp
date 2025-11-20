import Message from "../models/Message.js"
import User from "../models/User.js"
import cloudinary from "../lib/cloudinary.js";


export const getAllContacts=async(req,res)=>{
    try{
        const loggedInUserId=req.user._id;
        const filteredUsers=await User.find({_id:{$ne:loggedInUserId}}).select("-password")
res.status(200).json(filteredUsers)
    }
    catch(err){
        console.log(err)
    }

}

export const getMessagesByUserId=async(req,res)=>{
    try{
        const myId=req.user._id;
        const {id:receiverId}=req.params;

        const messages=await Message.find({
            $or:[
                {senderId:myId,receiverId:receiverId},
                {senderId:receiverId,receiverId:myId}
        ]})
        res.status(200).json(messages)



    } 
     catch(err){
        console.log(err)
    }

}

export const sendMessage=async(req,res)=>{
    try{
        const senderId=req.user._id
        const receiverId=req.params.id
        const {text,image} =req.body

        let imageUrl;
        if(image){
            const uploadResponse=await cloudinary.uploader.upload(image)
            imageUrl=uploadResponse.secure_url;
        }
        const newmsg=new Message({
            senderId,receiverId,
            text,
            image:imageUrl
        })
        await newmsg.save()
        //todo send rt message when user is online

        res.status(201).json(newmsg)

    }
     catch(err){
        console.log(err)
    }
}

export const getChatPartners=async(req,res)=>{
    try{
        const loggedInUser=req.user._id;
        //finding msgs where user is sndr/rcvr

        const messages=await Message.find({
            $or:[
                {senderId:loggedInUser},{receiverId:loggedInUser}
            ]
        })

        const chatPartnersIds=[...new Set(messages.map(msg=>msg.senderId.toString()===loggedInUser.toString()?
            msg.receiverId.toString() 
            : msg.senderId.toString()))
        ]
const chatPartners=await User.find({_id:{$in:chatPartnersIds}}).select("-password");

res.status(200).json(chatPartners)
    }
    catch(err){
        console.log(err)
    }
}