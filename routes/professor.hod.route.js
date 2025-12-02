import { Router } from "express";
import verifyJWT from "../middleware/verifyJWT.js";
import getDeptAssignments from "../controllers/sendAllAssignment.controller.js";
import updateAssignmetStatusByProfessor from "../controllers/updateAssignmentStatusProfessor.controller.js";
import updateAssignmetStatusByHOD from "../controllers/updateAssignmentStatusByHod.controller.js";
const professorHodRoute = Router()

professorHodRoute.get("/check-assignment",verifyJWT,getDeptAssignments)

professorHodRoute.put("/update-status-professor/:id",verifyJWT,updateAssignmetStatusByProfessor)

professorHodRoute.put("/update-status-hod/:id",verifyJWT,updateAssignmetStatusByHOD)

export default professorHodRoute