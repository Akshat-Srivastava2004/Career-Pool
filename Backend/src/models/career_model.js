import mongoose,{Schema} from "mongoose";

const Careerschema = new Schema({
    Email:{
        type: mongoose.Schema.Types.ObjectId,
        require:true,
    },
    Resume:{
        type:String,
        require:true,
    },
    Jobposition:{
        type:String,
        require:true,
    },
    Message:{
        type:String,
        require:true,
    },
},{
    timestamps:true
})

export const Career=mongoose.model("Career",Careerschema)