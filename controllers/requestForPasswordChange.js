import { PasswordReset } from "../models/user.password.reset.model.js"
import { User } from "../models/user.model.js"
const requestForPasswordChange = async (req, res) => {
    try {
        const {email, query} = req.body
        if(!email || !query) return res.status(400).json({message:"All Fields Are Required"})
        const existUser = await User.findOne({ email })
        if(!existUser) return res.status(404).json({message : "User With This Email Is Not Exist"})
        const existingRequest = await PasswordReset.findOne({user:existUser._id});
        if(existingRequest) return res.status(409).json({ message: "Password reset request already submitted" }); 
        await PasswordReset.create(
            {
                user:existUser._id,
                query
            }
        )
        return res.status(200).json({message:"Query Submitted"})

    } catch (error) {
        return res.status(501).json({message:"server error"})
    }
}

export default requestForPasswordChange