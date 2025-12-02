
import mongoose from 'mongoose'

const dbConnection = async() => {
    try {
    const db = await mongoose.connect(`${process.env.MONGODB_CONNECTION_URI}/UMS-PORTAL`)
    console.log("mongodb connected successfully")
} catch (error) {
    return  new Error("database connection error")
}
}

export default dbConnection