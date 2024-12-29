import React, { useEffect, useState } from 'react'
import UseConversation from '../zustand/UseConversation';
import axios from 'axios';

const useGetmessge = () => {
    const [loading ,setLoading]=useState(false)
    const {messages,setMessage,selectedConversation}=UseConversation()

    useEffect(()=>{
        const getMessage=async()=>{
                setLoading(true)
           if(selectedConversation && selectedConversation._id){
            try{
                const res=await axios.get(`/api/message/get/${selectedConversation._id}`)
                setMessage(res.data)
                setLoading(false)
            } 
            catch(error){
               console.log("error is getting message",error)
            }
           }
        }
        getMessage()
    },[selectedConversation,setMessage])
  return (
    {loading,messages}
  )
}

export default useGetmessge
