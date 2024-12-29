import React from 'react'
import Left from './Home/Leftpart/Left';
import Right from './Home/Rightpart/Right';
import Signup from './component/Signup';
import Login from './component/Login';
import { useAuth } from './context/AuthProvider';
import { Routes, Route, Navigate} from "react-router-dom"


const App = () => {
  const [AuthUser,setAthUser]=useAuth();
  console.log(AuthUser)
  return (
  
     <div>
       <Routes>
      <Route path="/" element={
        AuthUser ?  (<div className='flex h-screen' >
        <Left/>
        <Right/>
      </div>):(<Navigate to={"/login"}/>)
      }/>
      <Route path="/login" element={AuthUser ? <Navigate to="/"/>:<Login/>}/>
      <Route path="/signup" element={AuthUser ? <Navigate to="/"/>:<Signup/>}/>
     </Routes>
     </div>
  )
}

export default App
