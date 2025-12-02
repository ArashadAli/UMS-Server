import { PasswordReset } from "../models/user.password.reset.model.js";

const returnUserRequest = async (req, res) => {
    const requests = await PasswordReset.find()
    if(!requests || requests.length == 0) return res.status(404).json({message:"No Request"})
    console.log("user request for changing something : ",requests)
    return res.status(201).json({message:"ok", userRequest:requests})
}
export default returnUserRequest