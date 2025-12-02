import { User } from "../models/user.model.js";
import generateTokens from "../utils/generateTokens.js";
const login = async(req,res) => {
    try {
        const {email, password} = req.body;
        // console.log("body from postman : ",req.body)
        if(!email || !password){
           return res.status(401).json({message:"Invalid Credentials"})
        }
        const user = await User.findOne({email})
        if(!user){
            return res.status(401).json({message:"No User Found"})
        }
        const isMatch = await user.isPasswordCorrect(password)
        // console.log("check isMatch : ",isMatch)
        if(!isMatch){
            return res.status(401).json({message:"Invalid Password"})
        }
        const findUser = {
            _id:user._id,
            email:email
        } 
        const {accessToken, refreshToken} = await generateTokens(findUser);
        user.refreshToken = refreshToken
        await user.save({validateBeforeSave:false});
        const loggedInUser = await User.findOne({email}).select("-password -refreshToken");
        const options = {
            httpOnly:true,
            secure:false,
            sameSite:"lax"
        }

        return res
        .status(201)
        .cookie("accessToken",accessToken,options)
        .cookie("refreshToken",refreshToken,options)
        .json({
            message:"successfully login",
            user:loggedInUser,
            refreshToken:refreshToken
        })
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export default login