import { funcWrapper } from "../util/wraperFunction.js";
import announcementModel from "../models/announcement.model.js";
import { AppResponse } from "../util/AppResponse.js";

export const publishAnnocement=funcWrapper(async(req,res)=>{
    const instructorId=req.user.id;
    const annocement= await new announcementModel({...req.body,instructor:instructorId}).save();
    if(!annocement){
        throw "internal server error";
    }
    res.status(201).json(new AppResponse(annocement,"annocement created"));
})
export const deleteAnnouncement = funcWrapper(async (req, res) => {
   
    const { id } = req.params;
    const instructorId = req.user.id;

    
    const deletedAnnouncement = await announcementModel.findOneAndDelete({
        _id: id,
        instructor: instructorId
    });

    
    if (!deletedAnnouncement) {
        return res.status(404).json(new AppResponse(null, "Announcement not found or unauthorized"));
    }

    
    res.status(200).json(new AppResponse(null, "Announcement deleted successfully"));
});

export const getAllAnnouncements = funcWrapper(async (req, res) => {
   
    const announcements = await announcementModel.find().sort({ createdAt: -1 });
    
    if (!announcements) {
        return res.status(200).json(new AppResponse([], "No announcements found"));
    }
    
    res.status(200).json(new AppResponse(announcements, "Announcements fetched successfully"));
});