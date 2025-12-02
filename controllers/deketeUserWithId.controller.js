import { User } from "../models/user.model.js";

const deleteUserWithId = async (req , res) => {
    try {
        const userId = req.params.id
        const user = await User.findByIdAndDelete(userId)
        // console.log("deleted user : ",user)
        if(!user) return res.status(404).json({message:"User Not Found"})
        return res.status(200).json({message:"User Deleted Successfully"})
    } catch (error) {
        console.log("delete user with id error : ", error)
        return res.status(500).json({message:"server error"})
    }
}


export default deleteUserWithId