import { Router } from "express";
import  verifyJWT  from "../middleware/verifyJWT.js";
import login from '../controllers/login.js'
import register from "../controllers/register.js";
import { upload } from "../middleware/multer.middleware.js";
import logout from "../controllers/logout.controller.js";
import { sendOTPController } from "../controllers/otp.controller.js";
import otpExpiry from "../controllers/otpExpiry.contrller.js";
import verifyUserWithOTP from "../controllers/verifyUserWithOTP.controller.js";
const router = Router()

router.post("/login", login);

router.post("/register",verifyJWT,(req,res,next) => {
    try {
        const user = req.user;
        //console.log("current user : ",user)
        if(!user){
            return res.status(401).json({message:"user not exist"})
        }
        if(user.role != "admin"){
            return res.status(401).json({message:"UnAuthorized Access"})
        }
        console.log("reaches to last")
        return next()
    } catch (error) {
        console.log("error message : ",error.message);
        return res.status(501).json({message:"server problem while verifying admin"})
    }
},upload.single("profile"),register);

router.post("/logout",verifyJWT,logout)
router.get("/otp-send", verifyJWT, sendOTPController)
router.get("/expire-otp", verifyJWT, otpExpiry)
router.post("/otp-verification", verifyJWT, verifyUserWithOTP)

export default router