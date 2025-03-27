import { ApiError } from "../utils/ApiError.js";



import { uploadOnCloudinary } from "../utils/cloudinary.js";

import { Jobseekers } from "../models/job_seeker_model.js";
import { PostJob } from "../models/postjob_models.js";


const jobsekers=async(req,res)=>{
    const {email}=req.body;
    try {
        const requiredFields = [
            "firstName","lastName","zipcode",
            "address","state","phone",
            "city","resume","skills","education",
            "job","email","Password"
        ];
        
    
        const missingfield=requiredFields.filter(field=>!req.body[field]);
    
    
        if(missingfield.length>0){
            return res.status(400).json({
               success:false,
               message:`Missing required a field ${missingfield.join(", ")} `
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
       if(!jobseekersresume){
                throw new ApiError(400,"company logo is not defined ")
            }
    
            const jobseekersresumepath=await uploadOnCloudinary(jobseekersresume)
            console.log("the companylogopath from the cloudinary is ",jobseekersresumepath);
    
            const jobseekersdetails=await Jobseekers.create({
                firstName:requiredFields[4],
                lastName:requiredFields[5],
                education:requiredFields[0],
                skills:requiredFields[2],
                Job:requiredFields[1],
                email:requiredFields[8],
                zipcode:requiredFields[6],
                city:requiredFields[13],
                state:requiredFields[14],
                phone:requiredFields[7],
                address:requiredFields[12],
                Password:requiredFields[11],
                resume:jobseekersresume
            })
            const createdjobeekers=await Jobseekers.findById(jobseekersdetails._id).select(
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
const generateAcessTokenAndRefereshTokens=async(companyId)=>{
    try {
        const Jobseekers=await Jobseekers.findById(companyId)
        console.log(Jobseekers);
        const accessToken=Jobseekers.generateAcessToken()
        const refreshToken=Jobseekers.generateRefreshToken()
        console.log("accessToken is :",accessToken)
        console.log("refreshToken is :",refreshToken
        )
        Jobseekers.refreshToken=refreshToken;
        await Jobseekers.save();
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
    const {email,Password}=req.body
    console.log(email,Password)
    
    if(!email){
        throw new ApiError(400,"email is required")
    }
    const Jobseekers=await Jobseekers.findOne({
        $or:[{email}]
    })
    if(!Jobseekers){
        throw new ApiError(400,"company doesnot exist with this email")
    }
    const isPasswordvalid=await Jobseekers.isPasswordCorrect(Password)
    console.log(isPasswordvalid)

    if(!isPasswordvalid){
        throw new ApiError(400,"Password enter by you is incorrect please enter the correct password")
    }

    
 const {accessToken,refreshToken}= 
    await generateAcessTokenAndRefereshTokens(Jobseekers._id)
    console.log(accessToken)
    console.log(refreshToken)
 
     const loggedIncompany=await Jobseekers.findById(Jobseekers._id)
    //  select({ password: 0, refreshToken: 0 });
     console.log(loggedIncompany)
 
     const options={
         httpOnly:true,
         secure:true
     }
     const Jobseekersemail=email;
     
                                // SENDING THE TOKEN IN THE COOKIES//
                                
     return res
     .status(200).cookie("accessToken",accessToken,options)
     .cookie("refreshToken",refreshToken,options)
     .json({
        message:"Login successfully",
        data:Jobseekersemail
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