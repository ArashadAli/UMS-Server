import { Router } from "express";
import verifyJWT from "../middleware/verifyJWT.js";
import uploadAssignment from "../controllers/uploadAssignment.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import trackAssignment from "../controllers/myAssignment.controller.js";
const studentRouter = Router();

studentRouter.post("/assignment",verifyJWT, upload.array("assignment",10),uploadAssignment);

studentRouter.get("/my-assignment/:student_id", verifyJWT, trackAssignment)


export default studentRouter