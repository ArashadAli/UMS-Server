import { Assignment } from "../models/assignment.model.js"

const trackAssignment = async (req, res) => {
    try {
        const  assignmentId  = req.params.student_id
        console.log("student id : ",assignmentId)
        if(!assignmentId) return res.status(404).json({message:"Assignment Id Not Found"})
        const assignment = await Assignment.findOne({ student:assignmentId })
        if(!assignment) return res.status(404).json({message:"Assignment Not Found"})
        return res.status(200).json({message:"success",assignment})
    } catch (error) {
        return res.status(500).json({message:"server error"})
    }
}

export default trackAssignment