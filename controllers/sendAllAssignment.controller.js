import { populate } from "dotenv";
import { Assignment } from "../models/assignment.model.js";
import { Department } from "../models/department.model.js";

const getDeptAssignments = async (req, res) => {
    try {
        const user = req.user;

        
        if (user.role !== "professor" && user.role !== "hod") {
            return res.status(401).json({ message: "Unauthorized" });
        }

        
        const dept = await Department.findById(user.department).select("students");

        if (!dept) {
            return res.status(404).json({ message: "Department not found" });
        }

        
        const studentIds = dept.students;

        
        const assignments = await Assignment.find({
            student: { $in: studentIds }
        })
        .populate(
            {
                path:"student",
                select:"name email department",
                populate:{
                path:"department",
                select:"name"
                }
            },
        )
        

        return res.status(200).json(assignments);

    } catch (error) {
        console.log("sending assignment error:", error.message);
        return res.status(500).json({ message: "Server error" });
    }
};

export default getDeptAssignments;
