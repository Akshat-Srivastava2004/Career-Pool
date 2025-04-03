import { ApiError } from "../utils/ApiError.js";
import { PostJob } from "../models/postjob_models.js";

const postjob = async(req,res)=>{
    console.log(" Received Body:", req.body);
    try {
        const requiredFields=[
            "jobtitle","positiontype","department","numberposition","location","jobtype","salary","period","benefits","jobdetails","responsibilities","requirement","skills","dateapply","startdate","companyid"
        ]
    
        const missingfield=requiredFields.filter(field=>!req.body[field]);
    
        if(missingfield.length >0){
            return res.status(400).json({
                success:false,
                message:`Missing required a field ${missingfield.join(", ")} `,
                missingFieldsArray: missingfield
            })
        }
       const postjob=await PostJob.create({
              jobtitle:req.body[requiredFields[0]],
              positiontype:req.body[requiredFields[1]],
              department:req.body[requiredFields[2]],
              Numberpostion:req.body[requiredFields[3]],
              location:req.body[requiredFields[4]],
              jobtype:req.body[requiredFields[5]],
              salary:req.body[requiredFields[6]],
              period:req.body[requiredFields[7]],
              benefits:req.body[requiredFields[8]],
              jobdetails:req.body[requiredFields[9]],
              Responsibility:req.body[requiredFields[10]],
              Requirement:req.body[requiredFields[11]],
              skills:req.body[requiredFields[12]],
              dateapply:req.body[requiredFields[13]],
              startdate:req.body[requiredFields[14]],
              companyid:req.body[requiredFields[15]],
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