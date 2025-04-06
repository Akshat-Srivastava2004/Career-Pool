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

const updateappliersinpostjob = async(req,res)=>{
   try {
     const {postjobid,jobseekerid}=req.body;
     console.log("the jobseeker id to update in the apply section of postjob model ",jobseekerid)
     console.log("the postjob id is ",postjobid)
     if(!jobseekerid){
         throw new ApiError(500,"jobseeker id not found check it again  ")
     }
     if(!postjob){
        throw new ApiError(500,"postjob is not found check it again ")
     }
     const updatedPostJob = await PostJob.findByIdAndUpdate(
        postjobid,
        { $addToSet: { Apply: jobseekerid } }, // `$addToSet` avoids duplicates, use `$push` if you allow multiple
        { new: true }
    );
    if(!updatedPostJob){
        throw new ApiError(500,"updatepostjob is not able to update check it again ")
    }
    return res.status(201).json({
        success:true,
        message:"Postjob updated successfully",
        data:updatedPostJob
    })
     
   } catch (error) {
    console.error("Error updating appliers in postjob:", error);
    res.status(500).json({ message: "Server error", error: error.message });
    
   }

}

export {postjob,updateappliersinpostjob}