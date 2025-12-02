import { User } from "../models/user.model.js"

const getAllProfessorForStudent = async (req, res) => {
    try {
        const users = await User.find({role:"professor"}).select("-password -refreshToken").lean()
        // console.log("all admin : ",users)
        if(!users || users.length == 0) return res.status(404).json({message:"Professor Not Found"})
        
        return res.status(201).json({message:"ok",allAdmin:users})
    } catch (error) {
        return res.status(500).json({message : "Professor Fetching Problem"})
    }
}

export default getAllProfessorForStudent