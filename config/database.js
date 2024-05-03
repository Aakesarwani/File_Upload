import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbConnect=()=>{
    mongoose.connect(process.env.DATABASE_URL,{})
    .then(()=>{console.log("Db Connection Successful")})
    .catch((err)=>{
        console.log("Issue in Db Connection");
        console.log(err.message);
        process.exit(1);
    })
}
export default dbConnect;