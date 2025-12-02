import { Department } from "../models/department.model.js"

const editDepartment = async (req, res) => {
    try {
        const departmentId = req.params.id
        if(!departmentId) return res.status(404).json({message:"DepartmentId Not Found"})
        console.log("departmentId : ",departmentId)
        const department = await Department.findOne({ departmentId })
        if(!department) return res.status(404).json({message:"Department Not Found"})
        return res.status(200).json({message:"ok", department})
    } catch (error) {
        console.log("edit dept error : ",error.message)
        return res.status(500).json({message:"server error"})
    }
}

export default editDepartment