import { Response } from "../entity/Response.js";
import UserModel from "../models/user.model.js";
import { funcWrapper } from "../util/wraperFunction.js";

export const getAllUser = funcWrapper(async (req, res)=>{
    const users = await UserModel.find({role:{$not:{$in:"ADMIN"}}}).select("-password");
    if(!users){
        throw "No users found";
    }
    res.status(200).json(new Response(users, "Success"));
})

export const getDashboard = funcWrapper(async (req, res)=>{
    
})