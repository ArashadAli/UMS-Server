import { PasswordReset } from "../models/user.password.reset.model.js"
import { User } from "../models/user.model.js"
import generateUniquePassword from "../utils/random.password.generator.js"
import bcrypt from 'bcrypt'
import sendUpdatedPasswordToUserEmail from "../utils/sendUpdatedPasswordToUserEmail.js"
const updateUserPassword = async (req, res) => {
    try {
        const userQueryId = req.params.id
        // console.log("user query id : ",userQueryId)
        if(!userQueryId) return res.status(404).json({message:"User Query Id Not Found"})
        const queryUser = await PasswordReset.findById(userQueryId)
        // console.log("queryUser : ",queryUser)
        if(!queryUser) return res.status(404).json({message:"Query User Not Found"})
        const userId = queryUser.user
        if(!userId) return res.status(404).json({message:"User Id Not Found"})
        const newPassword = generateUniquePassword()
        const hashedNewPassword = await bcrypt.hash(newPassword,10)
        const user = await User.findByIdAndUpdate(userId,
            {
                password:hashedNewPassword,
            },
            {
                new:true
            }
        )
        if(!user) return res.status(404).json({message:"User Not Found"})

        const sent = await sendUpdatedPasswordToUserEmail(newPassword,user.email)

        if(!sent) return res.status(401).json({message:"Password Not Send To User Email"})

        return res.status(200).json({message:"Password Sent To User Email Successfully"})
    } catch (error) {
        console.log("error when updating user query",error.message)
        return res.status(500).json({message:"server error"})
    }
}

export default updateUserPassword