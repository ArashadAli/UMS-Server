import { User } from "../models/user.model.js";
const otpExpiry = async (req, res) => {
    try {
        const user = req.user;
        if( !user ) return res.status(401).json({message:"User Not Found"})
        const loggedInUser = await User.findOne({ email:user.email})
        if(!loggedInUser) return res.status(401).json({message:"User Not Found"})
        loggedInUser.otp = null
        loggedInUser.otpExpiry = new Date(Date.now());
        await loggedInUser.save()
        return res.status(201).json({message:"OTP Expired Successfully"})
    } catch (error) {
        console.log("otp expiry error")
        return res.status(501).json({message:"server error"})
    }
}
export default otpExpiry