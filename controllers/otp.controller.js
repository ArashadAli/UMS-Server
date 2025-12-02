import { generateOtp } from "../utils/generateotp.js"
import { User } from "../models/user.model.js"
import sendOTPEmail from "../utils/sendOTPEmail.js"
export const sendOTPController = async ( req , res ) => {
    try {
        const user = req.user
        const email = user.email
        if(!email) return res.status(401).json({message:"UnAuthorized Access"})
        const currentUser = await User.findOne({ email })
        if( !currentUser ) return res.status(401).json({message:"User Not Found"})
        const otp = generateOtp();
        currentUser.otp = otp
        currentUser.otpExpiry =  new Date(Date.now() + 2 * 60 * 1000);
        await currentUser.save()
        const sent = await sendOTPEmail(otp, email)
        if (!sent)
            return res.status(500).json({ message: "Failed to send OTP" });

        return res.status(200).json({ message: "OTP sent successfully" });
    } catch (error) {
        return res.status(500).json({message:"server error"})
    }    
}