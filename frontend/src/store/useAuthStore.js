import {create} from "zustand"
import {axiosInstance} from "../lib/axios.js"
import toast from "react-hot-toast"


export const useAuthStore=create((set)=>({
    authUser:null,
    isCheckingAuth:true,
    isSigningUp:false,
    isLoggingIn:false,
    
    

    checkAuth:async()=>{
        try{
            const res=await axiosInstance.post('/auth/check')
            set({authUser:res.data})

        }
        catch(err){
            console.log("Error in auth :",err)
        }
        finally{
            set({isCheckingAuth:false})
        }
    },

    signup:async(data)=>{
        set({isSigningUp:true})
        try{
            const res=await axiosInstance.post('/auth/signup',data)
            set({authUser:res.data})
            toast.success("Account created successfully")

        }
        catch(err){
            console.log("signup error:",err)
            toast.error(err.response.data.message)
        }
         finally{
            set({isSigningUp:false})
        }


    },

    login:async(data)=>{
        try{
 const res=await axiosInstance.post('/auth/login',data)
            set({authUser:res.data})
            toast.success("Logged in successfully")
        }
        catch(err){
            console.log("login error:",err)
            toast.error(err.response.data.message)
        }
         finally{
            set({isLoggingIn:false})
        }

    },
    logout:async()=>{
        try{
            const res=await axiosInstance.post('/auth/logout')
            set({authUser:null})
toast.success("Logged out successfully")
        }
        catch(err){
            console.log("logout error:",err)
            toast.error(err.response.data.message)
        }
    },
    updateProfile:async(data)=>{
        try{
             const res=await axiosInstance.put('/auth/update-profile',data)
             set({authUser:res.data})
             toast.success("photo updated successfully")

        }
        catch(err){
            console.log("logout error:",err)
            toast.error(err.response.data.message)
        }


    }

}))