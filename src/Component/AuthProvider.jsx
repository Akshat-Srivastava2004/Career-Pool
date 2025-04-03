import { useState } from "react";
 
import { AuthContext } from "./AuthContext";
import { useEffect } from "react";
export const AuthProvider = ({children})=>{
    
    const [companyname,setCompanyname]=useState(null);
    const [companyid, setCompanyid]=useState(null);

    const [jobseekername,setJobseekername]=useState(null);
    const [jobseekerid,setJobseekerid]=useState(null);
    const [adminname,setAdminname]=useState(null);
    const [companydetails,setCompanydetails]=useState([]);
    const [jobseekersdetailsforadmin,setJobseekersdetailsforadmin]=useState([])
    const [feedbackdetails,setFeedbackdetails]=useState([])
    const [jobs, setJobs] = useState([]); // State to store job listings
    const API_URL1="http://localhost:5000/api/v1/jobseekers";
    const API_URL3="http://localhost:5000/api/v1/company";
    const API_URL4="http://localhost:5000/api/v1/admin";

    // First start with a register function


    const register = async (firstName, lastName, email, Password, phone, address, city, state, zipCode, education, skills, resume, job) => {
      try {
        const formData = new FormData();
        formData.append("firstName", firstName);
        formData.append("lastName", lastName);
        formData.append("email", email);
        formData.append("Password", Password);
        formData.append("phone", phone);
        formData.append("address", address);
        formData.append("city", city);
        formData.append("state", state);
        formData.append("zipCode", zipCode);
        formData.append("education", education);
        formData.append("skills", skills);
        formData.append("job", job);
        
        // if (resume) {
        //   formData.append("resume", resume);  // Ensure `resume` is a File object
        // }
        console.log("Resume file:", resume); // Debugging

        if (resume instanceof File) {
          formData.append("resume", resume);
        } else {
          console.error("Resume is not a valid File object.");
        }
        const response = await fetch(`${API_URL1}/jobseekersregister`, {
          method: "POST",
          body: formData, // No need for JSON.stringify()
        });
    
        const data = await response.json();
        console.log("Response:", data);
        if(response.ok){
          alert("Registered Successfully")
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };




   const registercompany=async(companyname,companydescription,companysize,companywebsite,firstName,lastName,zipCode,phone,email,logo,industry,password,address,city,state)=>{
    try {

      const formData=new FormData();

      formData.append("companyname",companyname);
      formData.append("companydescription", companydescription);
      formData.append("companysize",companysize);
      formData.append("companywebsite",companywebsite);
      formData.append("companywebsite",companywebsite);
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("phone", phone);
      formData.append("address", address);
      formData.append("city", city);
      formData.append("state", state);
      formData.append("zipCode", zipCode);
      formData.append("industry", industry);
      console.log("the industry is ",industry)


      console.log("logo  file:", logo); // Debugging

      if (logo instanceof File) {
        formData.append("logo", logo);
      } else {
        console.error("logo is  not a valid File object.");
      }
      const response=await fetch(`${API_URL3}/companyregister`,{
        method:"POST",
        body: formData, // No need for JSON.stringify()
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
    useEffect(() => {
      console.log("Updated company name:", companyname);
      console.log("updated company id :",companyid);
  }, [companyname,companyid]); // Runs whenever `companyname` changes
  





    const login=async(email,password)=>{
      try {
        const response = await fetch(`${API_URL1}/jobseekerslogin`,{
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify({email,password}),
        });

        const data=await response.json();
        if(response.ok){
          sessionStorage.setItem("jobseekername", data.jobseekdetail.firstName);
          sessionStorage.setItem("jobseekerid", data.jobseekdetail._id);
          setJobseekername(data.JobseekersoneData.firstName)
          setJobseekerid(data.JobseekersoneData._id);
          console.log("updated jobseekerlogin name ",data.JobseekersoneData.firstName)
          alert("Login successfull");
        }else{
          alert(data.message|| "Login failed");
        }
      } catch (error) {
        console.log("Error",error);
      }
    }






    const logincompany=async(email,password)=>{
      console.log("the login email is ",email)
      console.log("the passwords is ",password)
      try {
        const response = await fetch(`${API_URL3}/comapanylogin`,{
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify({email,password}),
        });

        const data=await response.json();
        if (response.ok) {
          if (data.companydetails) {
            sessionStorage.setItem("companyname", data.companydetails.companyname);
            sessionStorage.setItem("companyid", data.companydetails._id);
            setCompanyname(data.companydetails.companyname); 
            setCompanyid(data.companydetails._id);
            console.log("Updated company name (state):", data.companydetails.companyname);
            console.log("Updated company ID (state):", data.companydetails._id);
          } else {
              console.warn("No company details found in response:", data);
          }
          
          alert("Login successful");
      } else {
          alert(data.message || "Login failed");
      }
  } catch (error) {
      console.error("Error:", error);
  }
};

   const postjob=async(jobtitle,positiontype,department,numberposition,location,jobtype,salary,period,benefits,jobdetails,responsibilities,requirement,skills,dateapply,startdate,companyid)=>{
    try {
      const response=await fetch(`${API_URL3}/postjob`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({jobtitle,positiontype,department,numberposition,location,jobtype,salary,period,benefits,jobdetails,responsibilities,requirement,skills,dateapply,startdate,companyid }),
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
  
    const Careerhelper=async(Email,Positions,resume,Message)=>{
      try {

        const formData=new FormData();

        formData.append("Email",Email);
        formData.append("Positions", Positions);
        formData.append("Message",Message );


        console.log("Resume file:", resume); // Debugging

        if (resume instanceof File) {
          formData.append("resume", resume);
        } else {
          console.error("Resume is not a valid File object.");
        }
        const response =await fetch(`${API_URL4}/career`,{
          method:"POST",
          body: formData,
        })
        const data =await response.json();
        if(response.ok){
          console.log("the data is ",data)
          alert("Congratulations !! Your request for job has been reached to owner ",data)
        }
        else{
          alert(data.message || "job failed ")
        }
      } catch (error) {
        console.log("the error is ",error)
      }
    }

   const feedbackhelper=async(firstName,rating,feedbackType,email,message)=>{
    try {
      const response = await fetch(`${API_URL1}/feedback`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({firstName,rating,feedbackType,email,message})
      })
      const data = await response.json();
      if(response.ok){
        console.log("the data is ",data)
        alert("Feedback saved in the database",data)
      }
      else{
        alert("Feedback has not saved in the database")
      }
    } catch (error) {
      console.log("the error is ",error)
    }
   }


  const fetchedfilterjob=async()=>{
    try {
      const response=await fetch(`${API_URL1}/fetchfilteredjobs`,{
        method:"POST",
      })
      const data=await response.json();
      console.log("the recieve data ",data)
      if (data.success) {
        setJobs(data.filterdjobs); // Store jobs in context state
      }else{
        alert("unable to fetch the data from the database")
      }
    } catch (error) {
      console.log("the error is causing",error)
    }
  }

 // Fetch jobs when the app loads
 useEffect(() => {
  fetchedfilterjob();
}, []);

  const GetFeedback =async()=>{
    try {
      const response = await fetch(`${API_URL4}/getallfeedbacksdetails`,{
        method:"GET",
        headers:{"Content-type":"application/json"}
      })

      const data=await response.json();
      if(response.ok){
        setFeedbackdetails(data.message)
        console.log("the feedback for data is for admin  ",data)
        return data;
      }else{
        console.error("Error fetching feedbacks:", data.message);
        return [];
      }
    } catch (error) {
      console.error("The error is ",error);
    }
  }
  useEffect(()=>{
    GetFeedback()
  },[])


  const GetJobdseekersdetails =async()=>{
    try {
      const response = await fetch(`${API_URL4}/getjobseekersdetails`,{
        method:"GET",
        headers:{"Content-type":"application/json"}
      })

      const data=await response.json();
      if(response.ok){
        setJobseekersdetailsforadmin(data.message)
        console.log("the job seekers data is for admin  ",data)
        return data;
      }else{
        console.error("Error fetching Jobdseekersdetails:", data.message);
        return [];
      }
    } catch (error) {
      console.error("The error is ",error);
    }
  }
  useEffect(()=>{
    GetJobdseekersdetails();
  },[])


  const Getcompanydetails =async()=>{
    try {
      const response = await fetch(`${API_URL4}/allcompanydetails`,{
        method:"GET",
        headers:{"Content-type":"application/json"}
      })

      const data=await response.json();
      if(response.ok){
        setCompanydetails(data.message)
        return data;
      }else{
        console.error("Error fetching companydetails:", data.message);
      }
    } catch (error) {
      console.error("The error is ",error);
      
    }
  }
  useEffect(()=>{
    Getcompanydetails();
  },[])

  const Getcareerdetails =async()=>{
    try {
      const response = await fetch(`${API_URL4}/getallcareerdetails`,{
        method:"GET",
        headers:{"Content-type":"application/json"}
      })

      const data=await response.json();
      if(response.ok){
        return data;
      }else{
        console.error("Error fetching careerdetails:", data.message);
        return [];
      }
    } catch (error) {
      console.error("The error is ",error);
      return [];
    }
  }

  const loginadmin=async(username,Password)=>{
    try {
      const response=await fetch(`${API_URL4}/adminlogin`,{
       method:"POST",
       headers:{"Content-Type":"application/json"},
       body:JSON.stringify({username,Password})
      })

      const data=await response.json();
      if(response.ok){
        console.log("the data is ",data.details)
        setAdminname(data.details)
        alert("login successfully")
      }else{
        alert("unable to login dear")
      }
    } catch (error) {
      console.log("the error is ",error)
    }
  }

  const deletedetails=async(type,id)=>{
    try {
      const response=await fetch(`${API_URL4}/deletedetails/${type}/${id}`,{
        method:"Delete"
      })

      const data=await response.json()
      if(response.ok){
        console.log("the reponse data is ",data)
        alert("Details delete successfully")
      }
    } catch (error) {
      console.log(error)
    }
  }
    return(
      <AuthContext.Provider value={{companyid,jobseekername,jobseekerid,companyname,jobs,adminname,jobseekersdetailsforadmin,feedbackdetails,companydetails,register,login,registercompany,logincompany,postjob,Careerhelper,feedbackhelper,GetFeedback,GetJobdseekersdetails,Getcompanydetails,Getcareerdetails,fetchedfilterjob,loginadmin,deletedetails}}>
        {children}
      </AuthContext.Provider>
    )
}
