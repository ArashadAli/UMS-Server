import { Assignment } from "../models/assignment.model.js";

const updateAssignmetStatusByProfessor = async (req, res) => {
    try {
        const user = req.user;
        if (user.role !== "professor") {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const assignmentId = req.params.id;
        if (!assignmentId) {
            return res.status(400).json({ message: "Assignment ID not received" });
        }

        const { status, remark } = req.body;
        const allowedStatuses = ["professor-approved", "rejected"];

        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                message: "Invalid status. Allowed: professor-approved, rejected",
            });
        }

        const assignment = await Assignment.findById(assignmentId);
        if (!assignment) {
            return res.status(404).json({ message: "Assignment not found" });
        }

        assignment.status = status;
        assignment.professorRemark = remark || "";
        assignment.assignedProfessor = user._id;

        await assignment.save();

        return res.status(200).json({
            message: "Assignment updated successfully",
        });

    } catch (error) {
        console.log("Professor update assignment error:", error.message);
        return res.status(500).json({ message: "Server error" });
    }
};

export default updateAssignmetStatusByProfessor;
