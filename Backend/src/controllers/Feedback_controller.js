import { ApiError } from "../utils/ApiError.js";
import { Feedback } from "../models/feedback_model.js";


const feedback=async(req,res)=>{
    try {
        console.log("the receive data from the frontend ",req.body);
        const {firstName,rating,feedbackType,email,message}=req.body;

        const feedbackdetails=await Feedback.create({
            firstName:firstName,
            Email:email,
            FeedbackType:feedbackType,
            Messsage:message,
            Rating:rating
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