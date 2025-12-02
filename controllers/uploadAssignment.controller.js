import { Assignment } from "../models/assignment.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
const uploadAssignment = async (req, res) => {
    try {
        const { title, description} = req.body
        if(!title) return res.status().json({message:"Title Required"})
        const files = req.files
        const files_url = []
        for(let file of files){
            const uploaded = await uploadOnCloudinary(file.path)
            if(uploaded?.secure_url) files_url.push(uploaded.secure_url)
        }
        const assignment = await Assignment.create(
            {
                student:req.user._id,
                department:req.user.department,
                title,
                description,
                files:files_url
            }
        )
        res.status(201)
        .json(
            {
                success:true,
                message:"Assignment Uploaded",
                assignment,
            }
        )
    } catch (error) {
        console.log("error while uploading the assignment : ",error)
        return res.status(500).json({message:"server error"})
    }
}


export default uploadAssignment