import mongoose ,{Schema} from "mongoose";
import bcrypt from "bcrypt";


const Adminschema=new  Schema({
    username:{
        type:String,
        require:[true,"username is required "],
    },
    password:{
        type:String,
        require:[true,"password is required"]
    },
    Refreshtoken:{
        type:String,
        }, 
},{
    timestamps:true
})
Adminschema.pre("save", async function (next) {
    if (!this.isModified("password")) return next(); 
  
    try {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
      next();
    } catch (error) {
      next(error);
    }
  });



  Adminschema.methods.isPasswordCorrect = async function(Password) {
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



export const Admin = mongoose.model("Admin",Adminschema)

