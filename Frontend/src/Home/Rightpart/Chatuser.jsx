import React from 'react'
import UseConversation from '../../zustand/UseConversation'
import { useSocketContext } from '../../context/SocketContext';

const Chatuser = () => {
    const {selectedConversation}=UseConversation();
    const {onlineUsesrs}=useSocketContext();
    const getOnlineUserStatus=(userId)=>{
        return onlineUsesrs.includes(userId)?"online":"offline"
    }
    console.log(selectedConversation)
    return (
        <div className='flex space-x-3 h-[8vh] items-center justify-center bg-gray-800 hover:bg-slate-600 duration-300'>
            <div className="avatar online p-1">
                <div className="w-12 rounded-full">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
            </div>
            <div className='space-y-2'>
                <h1 className='text-xl'>{selectedConversation.fullname}</h1>
                <span className='text-sm'>{getOnlineUserStatus(selectedConversation._id)}</span>
            </div>
        </div>
    )
}

export default Chatuser
