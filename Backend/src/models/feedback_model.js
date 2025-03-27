import mongoose,{Schema} from "mongoose";

const Feedbackschema=new Schema({
    firstName:{
        type: mongoose.Schema.Types.ObjectId,
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
        type:mongoose.Schema.Types.ObjectId,
        require:true,
    },
    Messsage:{
        String:true,
        require:true,
    },
  


},{

    timestamps:true
})

export const Feedback = mongoose.model("Feedback",Feedbackschema)