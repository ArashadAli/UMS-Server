import mongoose from "mongoose";
import { Schema } from "mongoose";
import bcrypt from 'bcrypt'
const userSchema = mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            trim:true,
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
        },
        password:{
            type:String,
            required:true,
            minlength:6,
        },
        role:{
            type:String,
            enum:["admin","student","professor","hod"],
            default:"student"
        },
        image_uri:{
            type:String
        },
        department:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Department",
            default:null,
        },
        refreshToken:{
            type:String
        },
        otp:{
            type:String,
            default:null
        },
        otpExpiry:{
            type:Date,
            default:null
        } 
    },
    {timestamps:true}
)

userSchema.pre("save",async function(next){
    if (this.password.startsWith("$2")) {
        return next();
    }
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password,10);
    return next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

export const User = mongoose.model("User",userSchema)
