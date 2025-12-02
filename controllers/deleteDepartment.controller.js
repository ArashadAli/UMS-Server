import { Department } from "../models/department.model.js"

const deleteDepartment = async (req, res) => {
    try {
        const dept = req.params.id
        
        if(!dept) return res.status(404).json({message:"Dept Not Found"})
        const department = await Department.findByIdAndDelete(dept)
        if(!department) return res.status(404).json({message:"Department Not Found"})
        return res.status(200).json({message:"Department Deleted Successfully"})
    } catch (error) {
        console.log("delete department method error : ",error.message)
        return res.status(500).json({message:"server error"})
    }
}

export default deleteDepartment