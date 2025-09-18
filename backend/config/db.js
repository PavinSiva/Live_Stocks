import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()

const connectDB = async() => {
    try{
        const conn = await mongoose.connect(process.env.Mongo_DB_URL)
        console.log("MongoDB connected successfully !")
    
    }
    catch(err){
        console.log(err)
    }
}


export default connectDB