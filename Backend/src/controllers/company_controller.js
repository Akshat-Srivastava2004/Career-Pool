import { ApiError } from "../utils/ApiError.js";

import { uploadOnCloudinary } from "../utils/cloudinary.js";

import { Company } from "../models/employee_model.js";

const companyregister=async(req,res)=>{

    const {email,companyname}=req.body;
    console.log(" Received Body:", req.body);
    console.log(" Received Files:", req.files);
    console.log("Received File:", req.file);
    try {
        const requiredFields = [
            "companyname", "companydescription", "companysize", "companywebsite", 
            "firstName", "lastName", "zipCode", "phone", "email", 
            "industry", "password", "address", "city", "state"
        ];
    
        const missingfield=requiredFields.filter(field=>!req.body[field]);
    
        if(missingfield.length>0){
            return res.status(400).json({
               success:false,
               message:`Missing required a field ${missingfield.join(", ")} `
            })
        }


        const existedcompany=await Company.findOne({
            $or:[{email},{companyname}]
        })

        if(existedcompany){
            throw new ApiError(400,"company already existed ")
        }
        const companylogo=req.files?.logo?.[0]?.path;
        console.log("req.files:", req.files);
        console.log("the report path is ",companylogo)
        

        if(!companylogo){
            throw new ApiError(400,"company logo is not defined ")
        }

        const companylogopath=await uploadOnCloudinary(companylogo)
        console.log("the companylogopath from the cloudinary is ",companylogopath);

        const Companydetails=await Company.create({
            firstName:req.body[requiredFields[4]],
            lastName:req.body[requiredFields[5]],
            companyname:req.body[requiredFields[0]],
            companysize:req.body[requiredFields[2]],
            companydescription:req.body[requiredFields[1]],
            email:req.body[requiredFields[8]],
            zipcode:req.body[requiredFields[6]],
            city:req.body[requiredFields[12]],
            state:req.body[requiredFields[13]],
            phone:req.body[requiredFields[7]],
            address:req.body[requiredFields[11]],
            industry:req.body[requiredFields[9]],
            password:req.body[requiredFields[10]],
            logo:companylogopath.url
        })
        const createdcompany=await Company.findById(Companydetails._id).select(
            "-Password -refreshToken"
        )

        if(!createdcompany){
            throw new ApiError(500,"Sorry unable to register company")
        }
        return res.json({ "Company successfully registered": true });
    } catch (error) {
       throw new ApiError(400,"error aagaya hain bhaiya ",error)
    }
}



const generateAcessTokenAndRefereshTokens=async(companyId)=>{
    try {
        const company=await Company.findById(companyId)
        console.log(company);
        const accessToken=company.generateAcessToken()
        const refreshToken=company.generateRefreshToken()
        console.log("accessToken is :",accessToken)
        console.log("refreshToken is :",refreshToken
        )
        company.refreshToken=refreshToken;
        await company.save();
       console.log("token aagya hai wth ")
        // console.log(refreshToken)
        // await company.save({validateBeforeSave:false})
        return {accessToken,refreshToken}
    } catch (error) {
        throw new ApiError(500,"somethning went wrong  while generating tokens",error)
    }
    }


    // company ENTERING THE companyNAME AND PASSWORD FOR LOGIN//

const logincompany=(async(req,res)=>{
    const {email,password}=req.body
    console.log(email,password)
    
    if(!email){
        throw new ApiError(400,"email is required")
    }
    const company=await Company.findOne({
        $or:[{email}]
    })
    if(!company){
        throw new ApiError(400,"company doesnot exist with this email")
    }
    const isPasswordvalid=await company.isPasswordCorrect(password)
    console.log(isPasswordvalid)

    if(!isPasswordvalid){
        throw new ApiError(400,"Password enter by you is incorrect please enter the correct password")
    }

    
 const {accessToken,refreshToken}= 
    await generateAcessTokenAndRefereshTokens(company._id)
    console.log(accessToken)
    console.log(refreshToken)
 
     const loggedIncompany=await Company.findById(company._id)
    //  select({ password: 0, refreshToken: 0 });
     console.log(loggedIncompany)
     const companyData = company.toObject(); 
     delete companyData.password;
     delete companyData.refreshToken;
     const options={
         httpOnly:true,
         secure:true
     }
     
                                // SENDING THE TOKEN IN THE COOKIES//
                                
     return res
     .status(200).cookie("accessToken",accessToken,options)
     .cookie("refreshToken",refreshToken,options)
     .json({
        message:"Login successfully",
        companydetails:companyData
     })
     
})

export {companyregister,logincompany};