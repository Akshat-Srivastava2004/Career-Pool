import mongoose , {Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import process from "process"
const Jobseekersschema=new Schema({
    firstName:{
        type:String,
        require:true,
        index:true,
        trim:true,
    },
    lastName:{
        type:String,
        require:true,
        index:true,
        trim:true,
    },
    email:{
        type:String,
        require:true,
        index:true,
        trim:true,
    },
    Password:{
        type:String,
        require:[true,'password is required '],
    },
    address:{
        type:String,
        require:true,
        trim:true,
       
    },
    city:{
        type:String,
        require:true,
        trim:true,
        index:true,

    },
    state:{
        type:String,
        require:true,
        trim:true,
        index:true,
    },
    zipcode:{
        type:String,
        require:true,
        index:true,
    },
    education:{
        type:String,
        require:true,
    },
    skills:{
        type:String,
        require:true,
    },
    resume:{
        type:String,
        require:[true,"resume is required"],
    },
    Job:{
        type:String,
        require:[true,"job preference is required "]
    },
    Refreshtoken:{
        type:String,
        }, 

},{
    timestamps:true
})


Jobseekersschema.methods.isPasswordCorrect = async function(Password) {
    // Check if Password is provided
    if (!Password) {
        throw new Error("Password is required for comparison.");
    }
    // Check if this.Password is set
    if (!this.Password) {
        throw new Error("Hashed password is missing in the database.");
    }
    return await bcrypt.compare(Password, this.Password);
};

Jobseekersschema.methods.generateAcessToken=function(){
    return jwt.sign(
        {
        _id:this.id,
        Name:this.Name,
        Email:this.Email,
        Bloodgroup:this.Bloodgroup,
        Phonenumber:this.Phonenumber
        },
        process.env.ACCESS_TOKEN_SECRET,
        {                                                               // generating token 
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
    }
    Jobseekersschema.methods.generateRefreshToken=function(){
        return jwt.sign(
            {
            _id:this.id
            },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn:process.env.REFRESH_TOKEN_EXPIRY
            }
        )
        }

export const Jobseekers = mongoose.model("Jobseekers",Jobseekersschema)