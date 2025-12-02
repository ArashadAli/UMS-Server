import { Router } from "express";
import verifyJWT from "../middleware/verifyJWT.js";
import requestForPasswordChange from "../controllers/requestForPasswordChange.js";
import returnUserRequest from "../controllers/returnUserRequest.js";
import deleteUserWithId from "../controllers/deketeUserWithId.controller.js";
import createDepartment from "../controllers/createDepartment.controller.js";
import allDepartments from "../controllers/allDepartments.controller.js";
import isAdmin from "../middleware/checkIsAdmin.middleware.js";
import deleteDepartment from "../controllers/deleteDepartment.controller.js";
import editDepartment from "../controllers/editDepartment.controller.js";
import updateDepartment from "../controllers/updateDepartment.controller.js";
import updateUserPassword from "../controllers/updateUserQuery.controller.js";
const adminRoute = Router()
adminRoute.post("/request-password-change", requestForPasswordChange);
adminRoute.get("/user-request",verifyJWT, isAdmin,returnUserRequest)
adminRoute.put("/updateUserPasswword/:id", verifyJWT, isAdmin, updateUserPassword)

adminRoute.delete("/delete-user/:id",verifyJWT, (req, res, next) => {
    try {
        const user = req.user;
        if(!user || user.role !== "admin") return res.status(401).json({message:"UnAuthorized Access"})
        return next()
    } catch (error) {
        console.log("error when deleting the user")
        return res.status(501).json({message:"server error"})
    }
}, deleteUserWithId)

adminRoute.post("/create-department",verifyJWT,(req, res, next) => {
    try {
        const user = req.user
        if(!user) return res.status(404).json({message:"User Not Found"})
        if(user.role != "admin") return res.status(401).json({message:"UnAuthorized Request"})
        return next()
    } catch (error) {
        console.log("creating department error : ",error)
        return res.status(500).json({message:"server error"})
    }
},createDepartment)
adminRoute.get("/allDepartment",verifyJWT,(req, res, next) => {
    try {
        const user = req.user
        if(!user) return res.status(404).json({message:"User Not Found"})
        if(user.role != "admin") return res.status(401).json({message:"UnAuthorized Request"})
        return next()
    } catch (error) {
        console.log("creating department error : ",error)
        return res.status(500).json({message:"server error"})
    }
},allDepartments)

adminRoute.get("/deleteDepartment/:id", verifyJWT, isAdmin, deleteDepartment)
adminRoute.get("/editDepartment/:id", verifyJWT, isAdmin, editDepartment)
adminRoute.put("/updateDepartment/:id", verifyJWT, isAdmin, updateDepartment)


export default adminRoute