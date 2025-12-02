import { User } from "../models/user.model.js"

const getAllUserForAdmin = async (req, res) => {
    try {
        const users = await User.find({role:["student","professor"]}).select("-password -refreshToken").lean()
        // console.log("all admin : ",users)
        if(!users || users.length == 0) return res.status(404).json({message:"Users Not Found"})
        
        return res.status(201).json({message:"ok",allAdmin:users})
    } catch (error) {
        return res.status(500).json({message : "Users Fetching Problem"})
    }
}

export default getAllUserForAdmin