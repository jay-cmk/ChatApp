import React, { useState } from 'react'
import { IoMdSend } from "react-icons/io";
import useSendMessage from '../../context/useSendMessage';


const Typesend = () => {
    const { loading, sendMessage } = useSendMessage()
    const [message, setMessage] = useState("")

    const handleSubmit = async (e) => {
        console.log("message type",e.target.value)
        e.preventDefault();
        await sendMessage(message)
        setMessage("")
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className='flex space-x-3 h-[8vh] bg-gray-800 items-center'>
                <div className='w-[70%] mx-4'>
                    <input type="text"
                        placeholder="Type here"
                        className="input 
                input-bordered w-full bg-slate-950 "
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                </div>
                <button>
                    <IoMdSend className='text-2xl ' />
                </button>
            </div>
        </form>
    )
}

export default Typesend
