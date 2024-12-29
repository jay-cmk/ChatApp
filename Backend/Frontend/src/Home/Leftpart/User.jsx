import React from 'react'
import User2 from './User2'
import useGetAllUser from '../../context/useGetAllUser'

const User = () => {
    const [allUsers, loading] = useGetAllUser()
    console.log("allUsers = ", allUsers)
    return (
        <div className=''> 
            <h1 className='px-8 py-2 rounded-md text-white bg-slate-800'>Messages</h1>
            <div className='py-2 overflow-y-auto flex-1' style={{ maxHeight: "calc(84vh - 10vh" }}>
                {Array.isArray(allUsers) &&
                    allUsers.map((user, index) => (
                        <User2 key={index} user={user} />
                    ))
                }
            </div>
        </div>
    )
}

export default User
