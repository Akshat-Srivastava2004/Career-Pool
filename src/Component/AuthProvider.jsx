import { useState } from "react";
 
import { AuthContext } from "./AuthContext";
export const AuthProvider = ({children})=>{
    const [user,setUser]=useState(null);
    const API_URL="https://example.com/api";

    // First start with a register function


    const register = async(firstName,lastName,email,password,phone,address,city,state,zipCode,education,experience,skills,resume,jobPreference)=>{
      try {
        const response=await fetch(`${API_URL}/register`,{
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify({firstName,lastName,email,password,phone,address,city,state,zipCode,education,experience,skills,resume,jobPreference}),
        });

        const data=await response.json();
        if(response.ok){
          alert("Registration successfull!");
        }else{
          alert(data.message || "Registration Failed");
        }
      } catch (error) {
        console.log("Error:",error)
      }
    };
   const registercompany=async(companyname,companydescription,companysize,companywebsite,firstName,lastName,zipCode,phone,email,logo,industry,password,address,city,state)=>{
    try {
      const response=await fetch(`${API_URL}/registercompany`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({companyname,companydescription,companysize,companywebsite,firstName,lastName,zipCode,phone,email,logo,industry,password,address,city,state})
      })

      const data=await response.json();
      console.log("the data is ",data)
      if(response.ok){
        alert("Registration successfully")
      }
    } catch (error) {
      console.log("Error is ",error)
    }
   }
    // Login Function   

    const login=async(username,password)=>{
      try {
        const response = await fetch(`${API_URL}/login`,{
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify({username,password}),
        });

        const data=await response.json();
        if(response.ok){
          setUser(data.User);
          alert("Login successfull");
        }else{
          alert(data.message|| "Login failed");
        }
      } catch (error) {
        console.log("Error",error);
      }
    }
    const logicompany=async(username,password)=>{
      try {
        const response = await fetch(`${API_URL}/login`,{
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify({username,password}),
        });

        const data=await response.json();
        if(response.ok){
          setUser(data.User);
          alert("Login successfull");
        }else{
          alert(data.message|| "Login failed");
        }
      } catch (error) {
        console.log("Error",error);
      }
    }

   const postjob=async(jobtitle,positiontype,department,numberposition,location,jobtype,salary,period,benefits,jobdetails,responsibilities,requirement,skills,dateapply,enddate,startdate,enddatetostart)=>{
    try {
      const response=await fetch(`${API_URL}/postjob`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({jobtitle,positiontype,department,numberposition,location,jobtype,salary,period,benefits,jobdetails,responsibilities,requirement,skills,dateapply,enddate,startdate,enddatetostart }),
      });
      const data=await response.json();
      if(response.ok){
        alert("JOB/INTERNSHIP posted successfully")
      }else{
        alert(data.message || "job failed ")
      }
    } catch (error) {
      console.log("Error",error);
    }
   }
  
    const Careerhelper=async(Email,Positions,Resume,Mesesag)=>{
      try {
        const response =await fetch(`${API_URL}/career`,{
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify({Email,Positions,Resume,Mesesag})
        })
        const data =await response.json();
        if(data){
          alert("Careersavedin the database",data)
        }
        else{
          alert(data.message || "job failed ")
        }
      } catch (error) {
        console.log("the error is ",error)
      }
    }

   const feedbackhelper=async(firstName,Rating,Feedbacktype,Email,Message)=>{
    try {
      const response = await fetch(`${API_URL}/feedback`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({firstName,Rating,Feedbacktype,Email,Message})
      })
      const data = await response.json();
      if(data){
        alert("Feedback saved in the database",data)
      }
      else{
        alert("Feedback has not saved in the database")
      }
    } catch (error) {
      console.log("the error is ",error)
    }
   }
    return(
      <AuthContext.Provider value={{user,register,login,registercompany,logicompany,postjob,Careerhelper,feedbackhelper}}>
        {children}
      </AuthContext.Provider>
    )
}
