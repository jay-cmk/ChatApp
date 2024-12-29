import React from 'react';

const Message1 = ({ message }) => {
  const authUser = JSON.parse(localStorage.getItem("ChatApp")) || {}; // Fallback to empty object if null
  const itsMe = message?.senderId === authUser.user._id; // Safely access properties
  console.log("authId =",authUser.user._id)
  // console.log("Auth User:", authUser);
  console.log("Message User:", message?.senderId);
  

  const chatName=itsMe? "chat-end":"chat-start"
  const chatColor=itsMe?"bg-blue-500":"bg-blue-300"

  const createdAt=new Date(message.createdAt)
  const formatedTime=createdAt.toLocaleTimeString([],
    {
      hour:'2-digit',
      minute:'2-digit'
    }
  )
  return (
    <div>
      <div className="p-4">
       
          <div className={`chat ${chatName}`}>
            <div className={`chat-bubble chat-bubble-info ${chatColor}`}>{message?.message}</div>
            <div className='chat-footer'>{formatedTime}</div>
          </div>
        
          {/* <div className="chat ">
            <div className="chat-bubble chat-bubble-warning">hello i am here</div>
          </div> */}
        
      </div>
    </div>
  );
};

export default Message1;
