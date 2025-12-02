import { Department } from "../models/department.model.js"
const updateDepartment = async (req, res) => {
    try {
        const departmentId = req.params.id
        if(!departmentId) return res.status(404).json({message:"DepartmentId Not Found"})
        const {name} = req.body
        if(!name) return res.status(401).json({message:"Field Can't Be Empty"})
        const department = await Department.findByIdAndUpdate(departmentId,
            {name},
            {new:true}
        )
        return res.status(200).json({message:"Department Updated Successfully"})
        
    } catch (error) {
        console.log("error when updating the department : ",error.message)
        return res.status(500).json({message:"server error"})
    }
}

export default updateDepartment