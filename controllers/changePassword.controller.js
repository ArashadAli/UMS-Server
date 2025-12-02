import { User } from "../models/user.model.js"
import bcrypt from 'bcrypt'
const changePassword = async (req, res) =>{
    try {
        const { password } = req.body
        if(!password) return res.status(404).json({message:"Empty Field Not Allowed"})
        const user = req.user
        if(!user) return res.status(404).json({message:"UnAuthorized Request"})
        console.log("verified user : ",user)
        const hashedPassword = await bcrypt.hash(password,10)
        const updatedUser = await User.findByIdAndUpdate(user._id,
            {
                password:hashedPassword
            },
            {
                new:true
            }
        )
        if(!updatedUser) return res.status(401).json({message:"Password Not Updated"})
        return res.status(200).json({message:"Password Updated Successfully"})
    } catch (error) {
        console.log("error while updating password : ",error.message)
        return res.status(500).json({message:"server error"})
    }
}

export default changePassword