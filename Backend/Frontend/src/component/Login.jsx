import React from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";


const Login = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [AuthUser,setAuthUser] = useAuth();  
  const onSubmit =async (data) => {
       const userInfo={
        // fullname:data.fullname,
        email:data.email,
        password:data.password,
        // confirmpassword:data.confirmpassword
       }
       console.log(userInfo)
       try {
        const response =await axios.post("/api/user/login", userInfo);
       if(response.data){
        localStorage.setItem("ChatApp",JSON.stringify(response.data))
       toast.success("successfully Log in")
        console.log(response.data);
        setAuthUser(response.data);
       } // Handle success response
      } catch (error) {
        // console.error("Error: ", error);
        if(error)
        toast.error("error",+ error)
        
      }
      }   
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-gray-200">
      <div className="w-full max-w-sm p-8 bg-gray-800 rounded-lg shadow-2xl">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <h1 className="text-3xl font-extrabold text-center text-blue-400">
            Welcome Back!
          </h1>
          <p className="text-sm text-center text-gray-400">
            Please log in to your account
          </p>

          {/* Email */}
          <label className="block">
            <span className="text-sm font-medium text-gray-400">Email</span>
            <div className="flex items-center mt-2 bg-gray-700 border border-gray-600 rounded-md focus-within:ring focus-within:ring-blue-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-5 w-5 text-gray-500 mx-3"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                type="email"
                placeholder="Enter your email"
                {...register("email", { required: true })} 
                className="flex-grow bg-transparent px-3 py-2 text-gray-300 placeholder-gray-500 focus:outline-none"
              />
            </div>
          </label>
          {errors.email && <span className="text-red-500 text-sm">This field is required</span>}

          {/* Password */}
          <label className="block">
            <span className="text-sm font-medium text-gray-400">Password</span>
            <div className="flex items-center mt-2 bg-gray-700 border border-gray-600 rounded-md focus-within:ring focus-within:ring-blue-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-5 w-5 text-gray-500 mx-3"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="password"
                placeholder="Enter your password"
                {...register("password", { required: true })} 
                className="flex-grow bg-transparent px-3 py-2 text-gray-300 placeholder-gray-500 focus:outline-none"
              />
            </div>
          </label>
          {errors.password &&  <span className="text-red-500 text-sm">This field is required</span>}

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-blue-400 rounded focus:ring-blue-300"
              />
              <span className="ml-2 text-sm text-gray-400">Remember me</span>
            </label>
            <a href="/forgot-password" className="text-sm text-blue-400 hover:underline">
              Forgot Password?
            </a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 rounded-md text-gray-900 font-bold hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Log In
          </button>

          {/* Divider */}
          <div className="flex items-center justify-center space-x-2 mt-6">
            <span className="block w-20 h-px bg-gray-700"></span>
            <span className="text-sm text-gray-400">or continue with</span>
            <span className="block w-20 h-px bg-gray-700"></span>
          </div>

         <div>
         <Link to={"/signup"}>
          <button
            
            className="w-full py-2 px-4 bg-blue-500 rounded-md text-gray-900 font-bold hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          >
            sign Up
          </button>
          </Link>
         </div>
          

          {/* Social Buttons */}
          {/* <div className="flex justify-center space-x-4 mt-4">
            <button className="flex items-center justify-center px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:ring focus:ring-blue-300">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                alt="Facebook"
                className="h-5 w-5"
              />
            </button>
            <button className="flex items-center justify-center px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:ring focus:ring-blue-300">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Google_icon.svg"
                alt="Google"
                className="h-5 w-5"
              />
            </button>
            <button className="flex items-center justify-center px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:ring focus:ring-blue-300">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/c/c9/Linkedin.svg"
                alt="LinkedIn"
                className="h-5 w-5"
              />
            </button>
          </div> */}
        </form>
      </div>
    </div>
  );
};

export default Login;
