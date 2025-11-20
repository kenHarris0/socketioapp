import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import { XIcon } from "lucide-react";

const ChatHeader = () => {
    const {selectedUser,setSelectedUser}=useChatStore()

    useEffect(()=>{
        const handleEscKey=(event)=>{
            if(event.key=="Escape"){
                setSelectedUser(null)
            }
        }


window.addEventListener("keydown",handleEscKey)

return ()=>{
    window.removeEventListener("keydown",handleEscKey)
}
    },[selectedUser])


  return (
    <div className='flex justify-between items-center bg-slate-800/50 border-b pb-[5px] pt-[5px] border-slate-700/50 max-h-[100px] px-6 flex-1'>
      <div className="flex items-center space-x-3">
        <div className="avatar online">
            <div className="w-10 rounded-full rinf ring-cyan-400/30 ring-offset-2">
            <img src={selectedUser.profilePic || "/avatar.png"} alt="" />
            </div>
        </div>

        <div>
            <h3 className='text-slate-200 font-medium'>{selectedUser.fullName}</h3>
            <p className='text-slate-400 text-sm'>Online</p>
        </div>
      </div>
       <button onClick={() => setSelectedUser(null)}>
        <XIcon className="w-5 h-5 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer" />
      </button>
    </div>
  )
}

export default ChatHeader
