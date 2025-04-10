"use client"

import { useContext, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import Navbar from "@/Component/Navbar"
import { AuthContext } from "@/Component/AuthContext"
export default function AdminLogin() {
const [username,setUsername]=useState("");
const [password,setPassword]=useState("");
const {loginadmin}=useContext(AuthContext)
const navigate=useNavigate();
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  console.log(setError)
  console.log(setLoading)
  const handleSubmit = async (e) => {
    e.preventDefault()
    loginadmin(username,password)
    navigate("/adminpage")
  }

  

  return (
    <div>
        <Navbar
                  navLinks={[
                { label: "Home", href: "/" },
                { label: "Feedback", href: "/feedback" },
                { label: "Career", href: "/Career" },
                { label:  "Aboutus" ,href:"/aboutus"},
              ]}
              showAuthButtons={false} 
              />
 <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
       
       <div className="sm:mx-auto sm:w-full sm:max-w-md">
         <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Admin Login</h2>
       </div>
 
       <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
         <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
           <form className="space-y-6" onSubmit={handleSubmit}>
             {error && (
               <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
                 <p className="text-red-700">{error}</p>
               </div>
             )}
 
             <div>
               <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                 Username
               </label>
               <div className="mt-1">
                 <input
                   id="username"
                   name="username"
                   type="text"
                   autoComplete="username"
                   required
                   value={username}
                   onChange= {(e)=>setUsername(e.target.value)}
                   className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                 />
               </div>
             </div>
 
             <div>
               <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                 Password
               </label>
               <div className="mt-1">
                 <input
                   id="password"
                   name="password"
                   type="password"
                   autoComplete="current-password"
                   required
                   value={password}
                   onChange={(e)=>setPassword(e.target.value)}
                   className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                 />
               </div>
             </div>
 
             <div>
               <button
                 type="submit"
                 disabled={loading}
                 className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
               >
                 {loading ? "Logging in..." : "Log in"}
               </button>
             </div>
           </form>
         </div>
       </div>
     </div>
    </div>
   
  )
}

