import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";
import { io } from "socket.io-client";
import { set } from "react-hook-form";

const SocketContext=createContext()
export const useSocketContext=()=>{
    return useContext(SocketContext)
}

export const SocketProvider=({children})=>{
    const [socket,setSocket]=useState()
    const [authUser]=useAuth();
    const [onlineUsesrs,setOnlineUsers]=useState()

    useEffect(()=>{
        if(authUser){
            const socket=io("http://localhost:8080",{
                query:{
                    userId:authUser.user._id
                },
            })
            setSocket(socket)
            socket.on("getOnlineUsers",(users)=>{
               setOnlineUsers(users)
            })
            return()=>socket.close()
        }else{
            if(socket){
                socket.close();
                setSocket(null);
            }
        }
    },[authUser])
    return(
        <SocketContext.Provider value={{socket,onlineUsesrs}}>{children}</SocketContext.Provider>
    )
}