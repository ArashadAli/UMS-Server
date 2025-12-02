import { Department } from "../models/department.model.js"
const createDepartment = async (req, res) =>{
    try {
        const {name} = req.body

        if(!name) return res.status(400).json({message:"Field Can't Be Empty"})
        await Department.create(
            {
                name,
            }
        )
        return res.status(200).json({message:"Department Created"})
    } catch (error) {
        return res.status(500).json({message:"server error"})
    }
}

export default createDepartment