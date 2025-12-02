import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dbConnection from './config/dbConnection.js'
import createUser from './utils/create.admin.js'

dotenv.config({
    path:'.env'
})

const server = express()

server.use(cors({
    origin:"*",
    methods:["GET","POST","DELETE","PUT","PATCH","OPTIONS"],
    allowedHeaders:["Content-Type","Authorization"],
    credentials:true
}))

server.use(express.urlencoded({extended:true}))
server.use(express.json())
server.use(cookieParser())



// STUDENT LOGIN ROUTES

import router from "./routes/auth.routes.js"
import userRouter from './routes/user.route.js'
import adminRoute from './routes/admin.route.js'
import studentRouter from './routes/student.route.js'
import professorHodRoute from './routes/professor.hod.route.js'

server.use("/api/auth",router)
server.use('/api/v1', userRouter)
server.use("/api/admin",adminRoute)
server.use("/api/student",studentRouter)
server.use("/api/professor-hod",professorHodRoute)

// server.use((req, res, next) => {
//   console.log("➡️ Incoming request:", req.method, req.url);
//   next();
// });


dbConnection()
.then(() => {
    createUser();
})
.then(() => {
    server.listen(process.env.PORT,() => {
    console.log(`server is runnig at PORT : http://localhost:${process.env.PORT}`)
})
})
.catch((error) => {
    console.log("mongodb error : ",error.message)
})
