import forumModel from "../models/forum.model.js";
import { AppResponse } from "../util/AppResponse.js";
import { funcWrapper } from "../util/wraperFunction.js";

// 1. CREATE A NEW POST
export const postForum = funcWrapper(async (req, res) => {
    const forums = await new forumModel(req.body).save();
    if (!forums) {
        throw "internal server error";
    }
    res.status(201).json(new AppResponse(forums, "forum created"));
});

// 2. GET ALL POSTS
export const getAllForums = funcWrapper(async (req, res) => {
  
    const forums = await forumModel.find().sort({ createdAt: -1 });
    res.status(200).json(new AppResponse(forums, "Forums fetched successfully"));
});

export const postReply = funcWrapper(async (req, res) => {
    const { id } = req.params; 
    const { reply, user } = req.body; 

    if (!reply || !reply.trim()) {
        return res.status(400).json({ success: false, message: "Reply text is required!" });
    }

    const newReply = {
        user: user || "Anonymous User",
        reply: reply,
        date: new Date().toLocaleString() 
    };

    
    const updatedForum = await forumModel.findByIdAndUpdate(
        id,
        { $push: { replies: newReply } },
        { new: true } // 
    );

    if (!updatedForum) {
        return res.status(404).json({ success: false, message: "successfully post" });
    }

    res.status(201).json(new AppResponse(updatedForum, "Reply added successfully"));
});