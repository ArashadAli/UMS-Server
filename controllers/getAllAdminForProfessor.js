import { User } from "../models/user.model.js"

const getAllAdminForProfessor = async (req, res) => {
    try {
        const users = await User.find({role:"admin"}).select("-password -refreshToken -department").lean()
        // console.log("all admin : ",users)
        if(!users || users.length == 0) return res.status(404).json({message:"Admin Not Found"})
        
        return res.status(201).json({message:"ok",allAdmin:users})
    } catch (error) {
        return res.status(500).json({message : "Admin Fetching Problem"})
    }
}

export default getAllAdminForProfessor