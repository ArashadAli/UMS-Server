import { Router } from "express";
import getAllUserForAdmin from "../controllers/getAllUserForAdmin.controller.js";
import verifyJWT from "../middleware/verifyJWT.js";
import getAllAdminForProfessor from "../controllers/getAllAdminForProfessor.js";
import getAllStudentForProfessor from "../controllers/getAllStudentForProfessor.js";
import getAllProfessorForStudent from "../controllers/getAllProfessorForStudent.js";
import getDepartment from "../controllers/getDepartment.controller.js";
import changePassword from "../controllers/changePassword.controller.js";
const userRouter = Router();

userRouter.get('/student/professor',getAllProfessorForStudent)

userRouter.get('/professor/student', getAllStudentForProfessor)

userRouter.get('/professor/admin',verifyJWT, (req, res, next) => {
    try {
        const user = req.user
        if(!user) return res.status(401).json({message : "user not found"})
        if(user.role !== 'professor') return res.status(401).json({message : "UnAuthorized Request"})
        return next()
    } catch (error) {
       // console.log("hitting /professor/admin -> this route problem")
        res.status(501).json({message:"server error"})
    }
}, getAllAdminForProfessor)


userRouter.get('/admins/users',getAllUserForAdmin)

userRouter.get("/getDepartment",verifyJWT,getDepartment)

userRouter.put("/change-password",verifyJWT,changePassword)
export default userRouter