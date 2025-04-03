import mongoose , {Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import process from "process"
const companyschema=new Schema({
    companyname:{
        type:String,
        require:true,
    },
    companysize:{
        type:String,
        require:true,
    },
    industry:{
        type:String,
        require:true,
    },
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
    password:{
        type:String,
        require:[true,'password is required '],
    },
    phone:{
        type:String,
        require:true,
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
    companydescription:{
        type:String,
        require:true,
    },
   
    logo:{
        type:String,
        require:[true,"job preference is required "]
    },
    Refreshtoken:{
        type:String,
        }, 

},{
    timestamps:true
})

companyschema.pre("save", async function (next) {
    if (!this.isModified("password")) return next(); // Avoid rehashing if not modified
  
    try {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
      next();
    } catch (error) {
      next(error);
    }
  });


companyschema.methods.isPasswordCorrect = async function(Password) {
    // Check if Password is provided
    if (!Password) {
        throw new Error("Password is required for comparison.");
    }
    // Check if this.Password is set
    if (!this.password) {
        throw new Error("Hashed password is missing in the database.");
    }
    return await bcrypt.compare(Password, this.password);
};

companyschema.methods.generateAcessToken=function(){
    return jwt.sign(
        {
        _id:this.id,
        companyname:this.companyname,
        firstName:this.firstName,
        email:this.email,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {                                                               // generating token 
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
    }
    companyschema.methods.generateRefreshToken=function(){
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

export const Company = mongoose.model("Company",companyschema)