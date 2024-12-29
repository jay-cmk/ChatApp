import React, { useState } from 'react'
import UseConversation from '../../zustand/UseConversation'
import { useSocketContext } from '../../context/SocketContext'

const User2 = ({user}) => {
   const {selectedConversation,setSelectedConversation}=UseConversation()

   const isSelected = selectedConversation?._id === user?._id;
   const {socket,onlineUsesrs}=useSocketContext()
   const isOnline = onlineUsesrs?.includes(user?._id); 
    return (
    <div className={`hover:bg-slate-700 duration-300 ${isSelected?"bg-slate-600":""}`} onClick={()=>setSelectedConversation(user) }>
      
       <div className='flex space-x-4 px-6 py-2 hover:bg-slate-700 cursor-pointer duration-300'>
                <div className={`avatar ${isOnline?"online":""}`}>
                    <div className="w-12 rounded-full">
                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                    </div>
                </div>
                <div>
                    <h1 className='font-bold'>{user.fullname}</h1>
                    <span>{user.email}</span>
                </div>
            </div>
    </div>
  )
}

export default User2
