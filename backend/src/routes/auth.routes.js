import express from "express"
import { signup,login,logout,updateProfile } from "../controllers/auth.controller.js";
import {protectRoute} from '../middleware/auth.middleware.js'
import {arcjetProtection} from "../middleware/arcjet.middleware.js"
const router=express.Router()

router.get('/test', arcjetProtection, (req, res) => {
  console.log("🔥 HIT TEST ROUTE");
  return res.json({ message: "hola amigo" });
});

router.post('/signup',signup)
router.post('/login',login)
router.post('/logout',logout)
router.post('/update-profile',protectRoute,updateProfile)
router.post('/check',protectRoute,(req,res)=>{
    try{
  res.status(200).json(req.user)
    }
  catch(err){
    console.log(err)
  }

})

export default router;