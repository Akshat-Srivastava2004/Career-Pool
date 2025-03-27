import { ApiError } from "../utils/ApiError.js";
import { Feedback } from "../models/feedback_model.js";


const feedback=async(req,res)=>{
    try {
        const {Email,firstname,feedbacktype,Rating,message}=req.body;

        const feedbackdetails=await Feedback.create({
            firstName:firstname,
            Email:Email,
            FeedbackType:feedbacktype,
            Messsage:message,
            Rating:Rating
        })

        if(!feedbackdetails){
            throw new ApiError(400,"Unable to save the feedback details")
        }
        return res.status(201).json({
            sucess:true,
            data:feedbackdetails
        })
    } catch (error) {
        throw new ApiError(401,"error caught",error)
    }
}

export {feedback}