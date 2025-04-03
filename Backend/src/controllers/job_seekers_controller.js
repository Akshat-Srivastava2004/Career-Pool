import { ApiError } from "../utils/ApiError.js";



import { uploadOnCloudinary } from "../utils/cloudinary.js";

import { Jobseekers } from "../models/job_seeker_model.js";
import { PostJob } from "../models/postjob_models.js";


const jobsekers=async(req,res)=>{
    const {firstName,lastName,email,password,phone,address,city,state,zipCode,education,skills,job}=req.body;
    console.log(firstName,lastName,email,password,phone,address,city,state,zipCode,education,skills,job);
    console.log(" Received Body:", req.body);
    console.log(" Received Files:", req.files);
    console.log("Received File:", req.file);
    try {
        const requiredFields = [
            "firstName","lastName","zipCode",
            "address","state","phone",
            "city","skills","education",
            "job","email","Password"
        ];
        console.log("all the require fields ",requiredFields)
    
        const missingfield=requiredFields.filter(field=>!req.body[field]);
    
    
        if(missingfield.length>0){
            return res.status(400).json({
               success:false,
               message:`Missing required a field ${missingfield.join(", ")} `,
               missingFieldsArray: missingfield
            })
        }
        const existedJobseekers=await Jobseekers.findOne({
                $or:[{email}]
            })
    
            if(existedJobseekers){
                throw new ApiError(400,"jobseekers already existed ")
            }
            const jobseekersresume=req.files?.resume?.[0]?.path;
            console.log("req.files:", req.files);
            console.log("the report path is ",jobseekersresume)
      
           if (!jobseekersresume) {
           return res.status(400).json({ message: "No file uploaded" });
           }

           console.log(" Resume File Path:", jobseekersresume);
    
            const jobseekersresumepath=await uploadOnCloudinary(jobseekersresume)
            console.log("the companylogopath from the cloudinary is ",jobseekersresumepath);
    
            const jobseekersDetails = await Jobseekers.create({
                firstName: req.body[requiredFields[0]],  
                lastName: req.body[requiredFields[1]],     
                zipcode: req.body[requiredFields[2]],      
                address: req.body[requiredFields[3]],        
                state: req.body[requiredFields[4]],          
                phone: req.body[requiredFields[5]],         
                city: req.body[requiredFields[6]],          
                skills: req.body[requiredFields[7]],         
                education: req.body[requiredFields[8]],        
                Job: req.body[requiredFields[9]],           
                email: req.body[requiredFields[10]],          
                password: req.body[requiredFields[11]],        
                resume: jobseekersresumepath.url
              });
              
            const createdjobeekers=await Jobseekers.findById(jobseekersDetails._id).select(
                "-Password -refreshToken"
            )
    
            if(!createdjobeekers){
                throw new ApiError(500,"Sorry unable to register jobseeker")
            }
            return res.json({ "jobseekers successfully registered": true });
        } catch (error) {
           throw new ApiError(400,"error aagaya hain bhaiya ",error)
        }
    }
const generateAccessTokenAndRefreshTokens=async(JobseekersId)=>{
    try {
        const Jobseeker = await Jobseekers.findById(JobseekersId);
        if (!Jobseeker) {
       throw new ApiError(404, "Jobseeker not found");
       }
        const accessToken=Jobseeker.generateAccessToken()
        const refreshToken=Jobseeker.generateRefreshToken()
        console.log("accessToken is :",accessToken)
        console.log("refreshToken is :",refreshToken
        )
        Jobseeker.Refreshtoken=refreshToken;
        await Jobseeker.save();
       console.log("token aagya hai wth ")
        // console.log(refreshToken)
        // await company.save({validateBeforeSave:false})
        return {accessToken,refreshToken}
    } catch (error) {
        throw new ApiError(500,"somethning went wrong  while generating tokens",error)
    }
    }


    // company ENTERING THE companyNAME AND PASSWORD FOR LOGIN//

const loginjobseekers=(async(req,res)=>{
    const {email,password}=req.body
    console.log(email,password)
    
    if(!email){
        throw new ApiError(400,"email is required")
    }
    const Jobseekersone=await Jobseekers.findOne({
        $or:[{email}]
    })
    if(!Jobseekersone){
        throw new ApiError(400,"company doesnot exist with this email")
    }
    const isPasswordvalid=await Jobseekersone.isPasswordCorrect(password)
    console.log(isPasswordvalid)

    if(!isPasswordvalid){
        throw new ApiError(400,"Password enter by you is incorrect please enter the correct password")
    }

    
 const {accessToken,refreshToken}= 
    await generateAccessTokenAndRefreshTokens(Jobseekersone._id)
    console.log(accessToken)
    console.log(refreshToken)
 
     const loggedIncompany=await Jobseekers.findById(Jobseekersone._id)
    //  select({ password: 0, refreshToken: 0 });
     console.log(loggedIncompany)
 
     const options={
         httpOnly:true,
         secure:true
     }
     const Jobseekersemail=email;
     const JobseekersoneData = Jobseekersone.toObject(); 
                                // SENDING THE TOKEN IN THE COOKIES//
                                
     return res
     .status(200).cookie("accessToken",accessToken,options)
     .cookie("refreshToken",refreshToken,options)
     .json({
        message:"Login successfully",
        jobseekdetail:JobseekersoneData
     })
     
})


const randomjobsdetails=async(req,res)=>{
    try {
        const randomJobs = await PostJob.aggregate([{ $sample: { size: 6 } }]); 

        res.status(201).json({
            success:true,
            data:randomJobs
        })
    } catch (error) {
        throw new ApiError(400,"the error is ",error)
    }
}



export {jobsekers,loginjobseekers,randomjobsdetails}