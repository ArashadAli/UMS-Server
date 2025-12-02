import { Department } from "../models/department.model.js"
const allDepartments = async (req, res) => {
    try {
        const departments = await Department.find()
        if(!departments) return res.status(404).json({message:"Department Not Found"})
        return res.status(200).json({message:"ok",departments})
    } catch (error) {
        return res.status(500).json({message:"server error"})
    }
}

export default allDepartments