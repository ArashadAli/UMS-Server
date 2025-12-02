import jwt from 'jsonwebtoken'
import { User } from '../models/user.model.js'
const verifyJWT = async (req,res,next) => {
try {
        // console.log("Cookies : ",req.cookies)
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")
        // console.log("token : ",token)
        if(!token){
            return res.status(401).json({ message: "Invalid Token" });
        }
        const decodedtoken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
        // console.log("decoded token : ",decodedtoken)
        const user = await User.findOne({email:decodedtoken?.email}).select("-password -refreshToken")
        if(!user){
           return res.status(401).json({ message: "Invalid Access Token" });
        }
        req.user = user
        next()
} catch (error) {
    console.log("error : ",error.message)
    return res.status(401).json({ message: "Invalid or expired token" })
}
}

export default verifyJWT