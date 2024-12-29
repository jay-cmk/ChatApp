import React, { useEffect, useRef } from 'react'
import Message1 from './Message1'
import useGetmessge from '../../context/useGetmessge'
import Loading from '../../component/Loading'
import useGetSocketMessage from '../../context/useGetSocketMessage'


const Messages = () => {
     const {loading,messages}=useGetmessge()
     useGetSocketMessage()  //listening incoming messages
     console.log("messages=",messages)
     const lastMsgRef=useRef()
     useEffect(()=>{
      setTimeout(()=>{
        if(lastMsgRef.current){
          lastMsgRef.current.scrollIntoView({
            behavior:"smooth",
          });
        }
      },100)
     },[messages])
    return (
        <div className='' style={{minHeight:"calc(84vh - 8vh)"}}>

          {loading?(<Loading/>):(messages.length>0 && messages.map((message)=>(
           <div key={message._id} ref={lastMsgRef}>
             <Message1 key={message._id} message={message}/>
           </div>  
          )))}

          {
            !loading && messages.length===0 &&(
              <div className='text-center mt-7'>
                hii to start conversation
              </div>
            )
          }
        </div>
    )
}

export default Messages
