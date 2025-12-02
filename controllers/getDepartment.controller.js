import { Department } from "../models/department.model.js";

const getDepartment = async (req, res) => {
  try {
    const user = req.user;

    if (!user) 
      return res.status(404).json({ message: "User not found" });

    if (!user.department) 
      return res.status(404).json({ message: "Department not assigned" });

    // Get department details + users inside department
    const department = await Department.findById(user.department)
      .populate("hod", "name email role image_uri")          
      .populate("professors", "name email role image_uri")
      .populate("students", "name email role image_uri");     

    if (!department)
      return res.status(404).json({ message: "Department not found" });

    return res.status(200).json({
      success: true,
      department
    });

  } catch (error) {
    console.log("Error in getDepartment:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
};

export default getDepartment;
