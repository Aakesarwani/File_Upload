import File from "../models/file.js"
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import { v2 as cloudinary } from 'cloudinary';

//localfileupload
export const localFileUpload=async(req,res)=>{
    try{
        const f=req.files.file;
        let  path=__dirname+"/files/"+Date.now()+`.${f.name.split('.')[1]}`;

        f.mv(path,(err)=>{console.log(err)});
        //console.log(`Path-> ${path}`);

        res.json({success:true,message:"Local file uploaded"});
    }catch(error){
        res.status(500).json({
            success:false,
            message:"Internal server error",
            errormessage:error.message,
        })

    }
}
function isFileTypeSupported(type,supportedTypes){
    return supportedTypes.includes(type);
}
async function uploadFileToCloudinary(file,folder,quality){
    const options={folder};
    if(quality){
        options.quality=quality;
    }
    options.resource_type="auto";
    return await cloudinary.uploader.upload(file.tempFilePath,options);
}

export const imageUpload=async(req,res)=>{
    try{
        const {name, tags, email}=req.body;
        const f=req.files.image;
        //validation
        const supportedTypes=["jpg","jpeg","png"];
        const fType=f.name.split('.')[1].toLowerCase();
        if(!isFileTypeSupported(fType,supportedTypes))
        {
            return res.status(400).json({
                success:false,
                message:"Not supported File type"
            })
        }

        //upload on cloudinary
        const response=await uploadFileToCloudinary(f,"Test");

        //save entry in db
        const fileData=await File.create({name,tags,email,imageUrl:response.secure_url});

        res.status(200).json({
            success:true,
            message:"Image uploaded successfully"
        });


    }catch(error){
        res.status(500).json({
            sucess:false,
            message:"Something went wrong",
            errormessage:error.message
        })
    }
}

export const videoUpload =async(req,res)=>{
    try{
        const {name, tags, email}=req.body;
        const f=req.files.video;
        //validation
        const supportedTypes=["mp4","mov"];
        const fType=f.name.split('.')[1].toLowerCase();
        if(!isFileTypeSupported(fType,supportedTypes))
        {
            return res.status(400).json({
                success:false,
                message:"Not supported File type"
            })
        }
        //upload on cloudinary
        const response=await uploadFileToCloudinary(f,"Test");

        //save entry in db
        const fileData=await File.create({name,tags,email,imageUrl:response.secure_url});
        res.status(200).json({
            success:true,
            message:"Video uploaded successfully"
        });



    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Something went wrong",
            errormessage:error.message
        })
    }
}


export const imageSizeReducer=async(req,res)=>{
    try{
        const {name, tags, email}=req.body;
        const f=req.files.image;
        //validation
        const supportedTypes=["jpg","jpeg","png"];
        const fType=f.name.split('.')[1].toLowerCase();
        if(!isFileTypeSupported(fType,supportedTypes))
        {
            return res.status(400).json({
                success:false,
                message:"Not supported File type"
            })
        }

        //upload on cloudinary
        const response=await uploadFileToCloudinary(f,"Test",30);

        //save entry in db
        const fileData=await File.create({name,tags,email,imageUrl:response.secure_url});

        res.status(200).json({
            success:true,
            message:"Image uploaded successfully"
        });

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Something went wrong",
            errormessage:error.message
        })
    }
}