import { User } from "../models/user.model.js";
import { Department } from "../models/department.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import bcrypt from "bcrypt";

const register = async (req, res) => {
  try {
    const { name, email, password, role, departmentId } = req.body;

    // Validate fields
    if (!name || !email || !password || !role || !departmentId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Upload image
    const localPath = req.file?.path;
    const imageURL = await uploadOnCloudinary(localPath);

    if (!imageURL?.secure_url) {
      return res.status(500).json({ message: "Image upload failed" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      image_uri: imageURL.secure_url,
      department: departmentId,
    });

    // Fetch department
    const dept = await Department.findById(departmentId);
    if (!dept) {
      return res.status(404).json({ message: "Department not found" });
    }

    // Update department based on role
    if (role === "student") dept.students.push(newUser._id);
    if (role === "professor") dept.professors.push(newUser._id);
    if (role === "hod") dept.hod = newUser._id;

    await dept.save();

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        department: departmentId,
        image: imageURL.secure_url,
      },
    });
  } catch (error) {
    console.log("Error while signup:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
};

export default register;
