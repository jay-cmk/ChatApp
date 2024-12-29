import axios from 'axios';
import React, { useState } from 'react'
import { BiLogOutCircle } from "react-icons/bi";
import Cookies from 'js-cookie'
import { toast } from 'react-toastify';



const Logout = () => {
    const [loading,setLoading]=useState(false)
    const handleLogOut=async()=>{
        setLoading(true)
        try{
            const res=await axios.post("/api/user/logout")
            localStorage.removeItem("ChatApp");
            Cookies.remove("jwt")
            toast.success("successfully logout")
            setLoading(false)
            window.location.reload()
        }
        catch(error){
          console.log("error in log out",error)
        }
    }
    return (
        <div className='h-[10vh]'>
             <div className=''>
                <BiLogOutCircle className='text-5xl text-white hover:bg-slate-600 duration-300 rounded-full p-2 ml-2' onClick={handleLogOut}/>
             </div>
        </div>
    )
}

export default Logout
