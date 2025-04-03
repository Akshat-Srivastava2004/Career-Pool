import { ApiError } from "../utils/ApiError.js";

import { Career } from "../models/career_model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
const career = async(req,res)=>{
    try {
        const {Email,Positions,Message}=req.body;

        console.log(Email,Positions,Message);
        const careerresume=req.files?.resume?.[0]?.path;
        console.log("req.files:", req.files);
        console.log("the report path is ",careerresume)
       if(!careerresume){
            throw new ApiError(400,"applicant resume  is not defined ")
        }

        const careerresumepath=await uploadOnCloudinary(careerresume)
        console.log("the companylogopath from the cloudinary is ",careerresumepath);

        const careerdetails=await Career.create({
            Email:Email,
            Resume:careerresumepath.url,
            Jobposition:Positions,
            Message:Message
        })
        if(!careerdetails){
            throw new ApiError(401,"unable to register your job")
        }

        return res.status(201).json({
            success:true,
            data:careerdetails
        })
    } catch (error) {
        throw new ApiError(401,"error caught",error)
    }
}

export {career}