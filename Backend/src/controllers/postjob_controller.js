import { ApiError } from "../utils/ApiError.js";
import { PostJob } from "../models/postjob_models.js";

const postjob = async(req,res)=>{
    try {
        const requiredFields=[
            "jobtitle","positiontype","department","numberofposition","location","job-type","salary","period","benefits","jobdetails","reponsibility","requirement","skills","dateapply","dateend","startdate","enddateforstart"
        ]
    
        const missingfield=requiredFields.filter(field=>!req.body[field]);
    
        if(missingfield){
            return res.status(400).json({
                success:false,
                message:`Missing required a field ${missingfield.join(", ")} `
            })
        }
       const postjob=await PostJob.create({
              jobtitle:requiredFields[0],
              positiontype:requiredFields[1],
              department:requiredFields[2],
              location:requiredFields[3],
              jobtype:requiredFields[4],
              salary:requiredFields[5],
              period:requiredFields[6],
              benefits:requiredFields[7],
              jobdetails:requiredFields[8],
              Responsibility:requiredFields[9],
              Requirement:requiredFields[10],
              skills:requiredFields[11],
              dateapply:requiredFields[12],
              enddate:requiredFields[13],
              startdate:requiredFields[14],
              Enddate:requiredFields[15]
       })
    
       if(!postjob){
        throw new ApiError(400,"job not posted successfully")
       }
    return res.json({
        success:true,
        message:"jobposted sucessfully"
    })
    } catch (error) {
        throw new ApiError(400,"error caught",error)
    }
}

export {postjob}