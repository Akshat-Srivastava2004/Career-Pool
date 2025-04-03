import { ApiError } from "../utils/ApiError.js";

import { Jobseekers } from "../models/job_seeker_model.js";
import { Company} from "../models/employee_model.js";
import { Feedback } from "../models/feedback_model.js";
import { Career } from "../models/career_model.js";
import { Admin } from "../models/Admin_model.js";


const adminregister = async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log("the username and password is",username,password)
        // Validate Input
        if (!username) {
            return res.status(400).json({ success: false, message: "Username is required" });
        }

        // Check if admin already exists
        const existedAdmin = await Admin.findOne({ username });
        if (existedAdmin) {
            return res.status(409).json({ success: false, message: "Admin already exists" });
        }

        // Create New Admin
        const adminDetails = await Admin.create({ username, password });
        if (!adminDetails) {
            return res.status(500).json({ success: false, message: "Failed to save admin" });
        }

        return res.status(201).json({
            success: true,
            adminDetails,
        });
    } catch (error) {
        console.error("Error registering admin:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
};

const adminlogin=async(req,res)=>{
    const {username,Password}=req.body;
    if(!username){
        throw new ApiError(401,"username is not found ")
    }
   const Adminexist=await Admin.findOne({
           $or:[{username}]
       })
       if(!Adminexist){
           throw new ApiError(400,"admin doesnot exist with this username")
       }
       const isPasswordvalid=await Adminexist.isPasswordCorrect(Password)
       console.log(isPasswordvalid)
    
       if(!isPasswordvalid){
           throw new ApiError(400,"Password enter by you is incorrect please enter the correct password")
       }

       return res.status(201).json({
        success:true,
        message:"login sucessfully",
        details:username
       })
    
}

const Getjobseekersdetails=async(req,res)=>{
    try {
        const jobseekersdetails=await Jobseekers.find();
        if(jobseekersdetails){
           console.log("the jobseekers details  are ",jobseekersdetails)
        }
        return res.status(201).json({
            success:true,
            message:jobseekersdetails
        })
    } catch (error) {
        throw new ApiError(401,"the error caught is ",error)
    }
}


const deletecompanyanjobseekers=async(req,res)=>{
   try {
    const {type,id}=req.params;
     
    if(!type){
        throw new ApiError(401,"type is required")
    }
    if(!id){
        throw new ApiError(401,"id is required")
    }
    
    let deletedEntity;

        if (type === "jobseekers") {
            deletedEntity = await Jobseekers.findByIdAndDelete(id);
        } else if (type === "company") {
            deletedEntity = await Company.findByIdAndDelete(id);
        }else if(type=="feedback"){
            deletedEntity=await Feedback.findByIdAndDelete(id);
        } else {
            return res.status(400).json({ success: false, message: "Invalid entity type" });
        }

        if (!deletedEntity) {
            return res.status(404).json({ success: false, message: `${type} not found` });
        }

        return res.status(200).json({ success: true, message: `${type} deleted successfully` });

   } catch (error) {
        console.log("the eror is required ",error)
   }
}
const allcompanydetails=async(req,res)=>{
    try {
        const alldetailsofcompany = await Company.find();
        if(alldetailsofcompany){
            console.log("the details of company ",alldetailsofcompany)
        }
        return res.status(201).json({
            success:true,
            message:alldetailsofcompany
        })
    } catch (error) {
        throw new ApiError(401,"the error caught is ",error)
    }
}

const getallfeedbacks=async(req,res)=>{
     try {
        const getallfeedbackdetails=await Feedback.find();
        if(getallfeedbackdetails){
            console.log("the feedback details is ",getallfeedbackdetails)
        }
        return res.status(201).json({
            success:true,
            message:getallfeedbackdetails
        })
     } catch (error) {
        throw new ApiError(401,"the error caught is ",error)
     }
}

const getallcareerdetails=async(req,res)=>{
    try {
        const getallcareerdetails=await Career.find();
        if(getallcareerdetails){
            console.log("the career details are ",getallcareerdetails)
            return res.status(201).json({"the career details are ":getallcareerdetails})
        }
    } catch (error) {
        throw new ApiError(401,"the error caught is ",error)
    }
}

export {getallfeedbacks,Getjobseekersdetails,allcompanydetails,getallcareerdetails,adminregister,adminlogin,deletecompanyanjobseekers}