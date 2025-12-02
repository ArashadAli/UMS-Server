import { User } from "../models/user.model.js";

const logout = async(req,res) => {
try {
  
    await User.findByIdAndUpdate(
      req.user._id,
      {
        $set:{
          refreshToken:undefined
        }
      },
      {
        new : true
      }
    )
    const options = {
      httpOnly:true,
      secure:false,
      sameSite:"lax"
    }
    return res
    .status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json({message:"user logged out"})
} catch (error) {
  
  return res.status(500).json({message:"error while logout"})
}
}

export default logout