import mongoose,{Schema} from "mongoose";

const Feedbackschema=new Schema({
    firstName:{
        type:String,
        require:true,
    },
    Rating:{
        type:Number,
        require:false,
    },
    FeedbackType:{
        type:String,
        require:true,
        index:true,
    },
    Email:{
        type:String,
        required: true,
    },
    Messsage:{
        type:String,
        require:true,
    },
},{

    timestamps:true
})

export const Feedback = mongoose.model("Feedback",Feedbackschema)