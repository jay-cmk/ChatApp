import React, { useEffect } from 'react';
import Chatuser from './Chatuser';
import Messages from './Messages';
import Typesend from './Typesend';
import UseConversation from '../../zustand/UseConversation';
import { useAuth } from '../../context/AuthProvider';

const Right = () => {
  const { selectedConversation, setSelectedConversation } = UseConversation();

  useEffect(() => {
    
    // Clear selected conversation only on component unmount
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div className="w-full md:w-[75%] bg-slate-900 text-gray-300 flex flex-col ">
      {!selectedConversation ? (
        <NoChatselected />
      ) : (
        <>
          <Chatuser />
          <div className="overflow-y-auto flex-1" style={{ maxHeight: "calc(92vh - 8vh)" }}>
            <Messages />
          </div>
          <Typesend />
        </>
      )}
    </div>
  );
};

export default Right;

const NoChatselected = () => {
  const [authUser] = useAuth();

  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-4">
      <h1 className="text-xl font-semibold">
        Welcome, <span className="text-blue-500">{authUser?.user?.fullname}</span>
      </h1>
      <p className="mt-2 text-gray-400">
        No chat selected. Please start a conversation by selecting a contact.
      </p>
    </div>
  );
};
