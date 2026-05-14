import { AppResponse } from "../util/AppResponse.js";
import UserModel from "../models/user.model.js";
import { funcWrapper } from "../util/wraperFunction.js";

export const getAllUser = funcWrapper(async (req, res)=>{
    let {pageNumber, pageLimit} = req.query;
    pageLimit = pageLimit||5;
    pageNumber = pageNumber||1;

    let query = {role:{$not:{$in:"ADMIN"}}};
    if(req.query.role){
        query['role']=req.query.role;
    }
    if(req.query.searchVal){
        query['$or']=[
            {name: {$regex:req.query.searchVal, $options:'i'}},
            {email: {$regex:req.query.searchVal, $options:'i'}},
        ]
    }
    const users = await UserModel.find(query).select("-password").skip((pageNumber-1)*pageLimit).limit(pageLimit);
    if(!users){
        throw "No users found";
    }
    res.status(200).json(new AppResponse(users, "Success"));
})

export const updateUser = funcWrapper(async (req, res)=>{
    const userId = req.params.userId;
    const {email, name} = req.body;
    let updatedDet = {};
    if(email) updatedDet['email']=email;
    if(name) updatedDet['name']=name;
    const user = await UserModel.findByIdAndUpdate({_id:userId}, {$set:updatedDet}, {
        runValidators:true,
    })
    if(!user) throw "Something Went Wrong";
    res.status(200).json(new AppResponse(null, "User Updated"));
})

export const removeUser = funcWrapper( async (req, res)=>{
    const userId = req.params.userId;
    await UserModel.findByIdAndDelete({_id:userId});
    res.status(200).json(new AppResponse(null, "User Deleted"));
})

export const getDashboard = funcWrapper(async (req, res)=>{
    
})