import {create} from "zustand"

export const useAuthStore=create((set)=>({
    authUser:{name:"john doe",age:20,_id:123},
    isLoggedIn:false,
    isLoading:false,

    login:()=>{
        console.log("logged in")
        set({isLoading:true,isLoggedIn:true})
    }

}))