import { v2 as cloudinary } from 'cloudinary';
import dotenv from "dotenv";

dotenv.config();

const cloudinaryConnect=()=>{
    try{
        cloudinary.config({
            cloud_name:process.env.CLOUD_NAME,
            api_key:process.env.API_KEY,
            api_secret:process.env.API_SECRET,
        })
        console.log("Cloudinary connection");

    }catch(err){
        console.log(err.message);
    }
}
export default cloudinaryConnect;