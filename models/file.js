import mongoose from "mongoose";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const fileSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    imageUrl:{
        type:String,
    },
    tags:{
        type:String,
    },
    email:{
        type:String,
    }
});
//post
fileSchema.post('save', async function(doc){
    try{
        //transporter
        let transporter=nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            },
        })
        //send mail
        let info=await transporter.sendMail({
            from:'Aastha',
            to:doc.email,
            subject:"New file uploaded on cloudinary",
            html:'<h2>Hello ji<h2><p>File Upoaded <a href="${doc.imageUrl}"></a><p>'
        })
    }catch(error){
        console.log(err);

    }
} )

const File=mongoose.model("File",fileSchema);
export default File;