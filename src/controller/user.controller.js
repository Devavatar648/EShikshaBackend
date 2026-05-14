import userModel from "../models/user.model";
import { AppResponse } from "../util/AppResponse";
import { funcWrapper } from "../util/wraperFunction";

// User
export const updateUser = funcWrapper(async (req, res)=>{
    const userId = req.params.id;
    if(!userId){
        throw "Pass valid userId";
    }
    await new userModel.findByIdAndUpdate({_id:userId}, {$set:req.body});
    res.status(200).json(new AppResponse(null, "User updated successfully!!!"));
})
