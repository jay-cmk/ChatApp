import React, {  createContext, useContext, useState } from 'react'
import Cookies from "js-cookie"

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const initialUserState = Cookies.get("jwt") || localStorage.getItem("ChatApp")

    //    parse the user data and storing in state.
    const [AuthUser, setAuthUser] = useState(
        initialUserState ? JSON.parse(initialUserState) : undefined
    )
    return (
        <div>
            <AuthContext.Provider value={[AuthUser, setAuthUser]}>
                {children}
            </AuthContext.Provider>
        </div>
    )
}

export const useAuth = () => useContext(AuthContext)
