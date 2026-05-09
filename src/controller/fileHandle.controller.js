import AssignmentModel from '../models/assignment.model.js';
import FileModel from '../models/file.model.js';
import crypto from 'crypto';
import { funcWrapper } from '../util/wraperFunction.js';
import { Response } from '../util/Response.js';


const getHash = (buffer) => {
    return crypto.createHash('sha256').update(buffer).digest('hex');
}

export const downloadAssignmentFile =funcWrapper(async (req,res)=>{

    const file=await FileModel.findOne({_id:id});

        console.log(file);
        
        if(!file){
            return res.status(200).json({statusCode:400,message:'File Not Exists..'})
        }
       
        res.set({
            'Content-Type':file.contentType,
            'Content-Disposition':`attachment;filename="${file.filename}"`
        })
        res.send(file.data);
}) 


export const uploadAssignmentFile = funcWrapper(async (req,res)=>{
   
    if (req.file) {
        const bufferHash = getHash(req.file.buffer);

        let file = await FileModel.findOne({ hashedData: bufferHash });

        if (!file) {

            file = await new FileModel({
            fileName: req.file.originalname,
            fileType: req.file.mimetype,
            fileData: req.file.buffer,
            hashedData: bufferHash
            }).save();
        }
    }
    // res.status(200).json("File Uploaded");
    throw "No file selected"
}) 