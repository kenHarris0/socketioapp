    import { create } from "zustand";
    import { axiosInstance } from "../lib/axios";
import {useAuthStore} from './useAuthStore.js'

    export const useChatStore=create((set,get)=>({
        allContacts:[],
        chats:[],
        messages:[],

        activeTab:"chats",
        selectedUser:null,
        isUserLoading:false,
        isMessagesLoading:false,
        isSoundEnabled:JSON.parse(localStorage.getItem("isSoundEnabled"))===true,

        toggleSound:()=>{
            localStorage.setItem("isSoundEnabled",!get().isSoundEnabled)
            set({isSoundEnabled:!get().isSoundEnabled})

        },
        setActiveTab:(tab)=>{
            set({activeTab:tab})

        },
        setSelectedUser:(selectedUser)=>{
            set({selectedUser})

        },

        getAllContacts:async()=>{
            set({isUserLoading:true})
            try{
                const res=await axiosInstance.get('/messages/contacts')
                set({allContacts:res.data})

            }
            catch(err){
                console.log(err)
            }
            finally{
                set({isUserLoading:false})
            }

        },
        getMyChatPartners:async()=>{
            set({isUserLoading:true})
            try{
                const res=await axiosInstance.get('/messages/chats')
                set({chats:res.data})

            }
            catch(err){
                console.log(err)
            }
            finally{
                set({isUserLoading:false})
            }

        },
        getMessagesByUserId:async(userId)=>{
            set({isMessagesLoading:true})
            try{
                const res=await axiosInstance.get(`/messages/${userId}`)
                set({messages:res.data})

            }
            catch(err){
                console.log(err)
                toast.error(err)
            }
            finally{
                set({isMessagesLoading:false})
            }

        },
        sendMessage:async(MessageData)=>{
            const {selectedUser,messages}=get()
            const {authUser}=useAuthStore.getState()
            
            try{
                const res=await axiosInstance.post(`/messages/send/${selectedUser._id}`,MessageData)
                set({messages:messages.concat(res.data)})
            }
            catch(err){
                console.log(err)
                toast.error(err)
            }
        }


    }))