import forumModel from "../models/forum.model";
import { AppResponse } from "../util/AppResponse.js";
import { funcWrapper } from "../util/wraperFunction.js";
export const postForum=funcWrapper(async(req,res)=>{
    const userId=req.user.id;
    const forums= await new forumModel({...req.body,user:userId}).save();
    if(!forums){
        throw "internal server error";
    }
    res.status(201).json(new AppResponse(forums,"forum created"));
})