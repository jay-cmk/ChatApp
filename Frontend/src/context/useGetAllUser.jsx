import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'

const useGetAllUser = () => {
    const [allUsers, setAllUsers] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const getUser = async () => {
            setLoading(true)
            try {
                const token = Cookies.get("jwt")
                console.log("Token alluser = ",token)
               const Response= await axios.get("/api/user/allusers", {
                Credentials: true,  // Required for sending cookies cross-domain
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log("setall user = ",Response.data)
                
                setAllUsers(Response.data);
               
                setLoading(false)
            }

            catch (error) {
                console.log("error", error)
            }
        }
        getUser()
    }, [])
    return  [allUsers, loading]
    
}

export default useGetAllUser
