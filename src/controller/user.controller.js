import userModel from "../models/user.model.js";
import { AppResponse } from "../util/AppResponse.js";
import { funcWrapper } from "../util/wraperFunction.js";

// User
export const updateUserSettings = funcWrapper(async (req, res)=>{
    const userId = req.user.id;
    if(!userId){
        throw "Pass valid userId";
    }
    const {name, email, password} = req.body;
    let updatedData = {};
    if(name) updatedData['name']=name;
    if(email) updatedData['email']=email;
    if(password){
        if(!email) throw "Email is required for updating password";
        const user = await userModel.findOne({email});
        if(!user) throw "Invalid user or email address";
        if(user.id!==userId){
            throw "You don't have permission for updating this user password";
        }
        updatedData['password']=password;
    }
    await new userModel.findByIdAndUpdate({_id:userId}, {$set:updatedData}, {runValidators:true});
    res.status(200).json(new AppResponse(null, "settings changed"));
})
