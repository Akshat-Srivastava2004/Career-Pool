import mongoose, { Schema } from "mongoose"; 

const postjobschema = new Schema({
    companyid:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Company",
        require:true,
    },
    jobtitle:{
        type:String,
        require:[true,'jobtitle is required '],
        index:true,
    },
    positiontype:{
        type:String,
        require:[true,'positiontype is required '],
    },
    department:{
        type:String,
        require:true,
    },
    Numberpostion:{
        type:String,
        require:true,
    },
    location:{
        type:String,
        require:true,
        index:true,
    },
    jobtype:{
        type:String,
        require:true,
        index:true,
    },
    salary:{
        type:String,
        require:true,
        index:true,
    },
    period:{
        type:String,
        require:true,
    },
    benefits:{
        type:String,
        require:true,
    },
    jobdetails:{
        type:String,
        require:true,
    },
    Responsibility:{
        type:String,
        require:true,
    },
    Requirement:{
        type:String,
        require:true,
    },
    skills:{
        type:String,
        require:true,
        index:true,
    },
    Apply:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Jobseeker",
    }],
    startdate:{
        type:String,
        required:true,
    },
    Enddate:{
        type:String,
        require:true,
    },
    dateapply:{
        type:String,
        require:true,
    },
    enddate:{
        type:String,
        require:true,
    },
},{
    timestamps:true
})

export const PostJob=mongoose.model("PostJob",postjobschema) 