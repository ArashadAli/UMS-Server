import { User } from "../models/user.model.js"

const getAllStudentForProfessor = async (req, res) => {
    try {
        const users = await User.find({role:"student"}).select("-password -refreshToken").lean()
        // console.log("all admin : ",users)
        if(!users || users.length == 0) return res.status(404).json({message:"Student Not Found"})
        
        return res.status(201).json({message:"ok",allAdmin:users})
    } catch (error) {
        return res.status(500).json({message : "Student Fetching Problem"})
    }
}

export default getAllStudentForProfessor