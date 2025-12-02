import { User } from "../models/user.model.js";
import bcrypt from 'bcrypt'
const createUser = async () => {
    try {
        const existUser = await User.findOne({role:"admin"});
        if(!existUser){
            const hashedPassword = await bcrypt.hash("12345678",10);
            await User.create({
            name: "Super Admin",
            email: "admin0786@university.com",
            password: hashedPassword,
            role: "admin",
          });
          console.log("admin created successfully")
        }
        else{
            console.log("admin already exist")
        }
    } catch (error) {
        console.log("error while creating admin : ",error.message)
    }
}

export default createUser