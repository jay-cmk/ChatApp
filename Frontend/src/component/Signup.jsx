import React from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";


const Signup = () => {
  const [AuthUser, setAuthUser] = useAuth();

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const password = watch("password", "")
  const confirmpassword = watch("confirmpassword", "")
  const validatePassMatch = (value) => {
    return value === password || "password not match"
  }

  const onSubmit = async (data) => {
    const userInfo = {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
      confirmpassword: data.confirmpassword
    }
    console.log(userInfo)
    try {
      const response = await axios.post("/api/user/signup", userInfo);
      if (response.data) {
        localStorage.setItem("ChatApp", JSON.stringify(response.data))
        toast.success("successfully created")
        console.log(response.data);
        setAuthUser(response.data)
      } // Handle success response
    } catch (error) {
      if (error.response)
        toast.error("Already Registered", + error.response.data.error)

    }
  }
  // console.log(watch("example")); 
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-gray-200">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <h1 className="text-3xl font-bold text-center text-gray-100">Text App</h1>
          <h2 className="text-lg font-medium text-center text-gray-400">Sign Up</h2>

          {/* Email */}
          <label className="block">
            <span className="text-sm font-medium text-gray-400">Email</span>
            <div className="flex items-center mt-2 border border-gray-600 rounded-md focus-within:ring focus-within:ring-blue-400 focus-within:ring-opacity-50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-5 w-5 text-gray-500 mx-2"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                type="email"
                placeholder="Email"
                {...register("email", { required: true })}
                className="flex-grow bg-gray-800 px-3 py-2 text-gray-300 placeholder-gray-500 focus:outline-none"
              />
            </div>
          </label>
          {errors.email && <span className="text-red-500 text-sm">This field is required</span>}
          {/* Username */}
          <label className="block">
            <span className="text-sm font-medium text-gray-400">Username</span>
            <div className="flex items-center mt-2 border border-gray-600 rounded-md focus-within:ring focus-within:ring-blue-400 focus-within:ring-opacity-50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-5 w-5 text-gray-500 mx-2"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input
                type="text"
                placeholder="Username"
                {...register("fullname", { required: true })}
                className="flex-grow bg-gray-800 px-3 py-2 text-gray-300 placeholder-gray-500 focus:outline-none"
              />
            </div>
          </label>
          {errors.fullname && <span className="text-red-500 text-sm">This field is required</span>}
          {/* Password */}
          <label className="block">
            <span className="text-sm font-medium text-gray-400">Password</span>
            <div className="flex items-center mt-2 border border-gray-600 rounded-md focus-within:ring focus-within:ring-blue-400 focus-within:ring-opacity-50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-5 w-5 text-gray-500 mx-2"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="password"
                placeholder="Password"
                {...register("password", { required: true })}
                className="flex-grow bg-gray-800 px-3 py-2 text-gray-300 placeholder-gray-500 focus:outline-none"
              />
            </div>
          </label>
          {errors.password && <span className="text-red-500 text-sm">This field is required</span>}
          {/* Confirm Password */}
          <label className="block">
            <span className="text-sm font-medium text-gray-400">Confirm Password</span>
            <div className="flex items-center mt-2 border border-gray-600 rounded-md focus-within:ring focus-within:ring-blue-400 focus-within:ring-opacity-50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-5 w-5 text-gray-500 mx-2"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="password"
                placeholder="Confirm Password"
                // value={confirmpassword}
                {...register("confirmpassword", { required: true, validate: validatePassMatch })}

                className="flex-grow bg-gray-800 px-3 py-2 text-gray-300 placeholder-gray-500 focus:outline-none"
              />
            </div>
          </label>
          {errors.confirmpassword && <span className="text-red-500 text-sm">{errors.confirmpassword.message}</span>}
          {/* Signup Button */}
          <div className="flex justify-between items-center mt-4">
            <p className="text-sm text-gray-400">
              Already have an account?{" "}
              <a href="/login" className="text-blue-400 hover:underline">
                Log in
              </a>
            </p>
           
           <button
              type="submit"
              className="px-6 py-2 text-gray-900 bg-blue-400 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300"
            >
              Sign Up
            </button>
          
            
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
