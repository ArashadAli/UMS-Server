import { User } from "../models/user.model.js"
const verifyUserWithOTP = async (req, res) => {
    try {
        const { otp } = req.body
        if(!otp) return res.status(401).json({message:"Invalid OTP"})
        const user = req.user
        if(!user) return res.status(401).json({message:"User Not Verified"})
        const email = user.email
        const currentUser = await User.findOne({email})
        if(!currentUser) return res.status(401).json({message:"User Not Found"})
        if(currentUser.otp !== otp) return res.status(401).json({message:"Invalid OTP"})
        return res.status(200).json({message:"ok",otpVerified:true})
    } catch (error) {
        console.log("otp verification error")
        res.status(501).json({message:"server error"})
    }
}
export default verifyUserWithOTP