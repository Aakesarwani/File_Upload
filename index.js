import express from "express";
import dotenv from "dotenv";
import fileRouter from "./routes/fileUpload.js"
import dbConnect from "./config/database.js";
import fileUpload from "express-fileupload";
import cloudinaryConnect from "./config/cloudinary.js";

dotenv.config();
const port=process.env.PORT;

const app=express();

app.use(express.json());
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:'/tmp/'
}));
app.use("/api/v1",fileRouter);

app.listen(port,()=>{
    console.log(`App running successfully on port ${port}`);
})
dbConnect();
cloudinaryConnect();