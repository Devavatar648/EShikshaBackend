import { funcWrapper } from "../util/wraperFunction.js";
import assignmentResultModel from "../models/assignmentResult.model.js";
import courseModel from "../models/course.model.js";
import { uploadAssignmentFile } from "./fileHandle.controller.js";
import assignmentModel from "../models/assignment.model.js";
import { AppResponse } from "../util/AppResponse.js";
import { ErrorResponse } from "../util/ErrorResponse.js";


export const addResult = funcWrapper(async (req, res) => {
    const { courseId,assignmentId } = req.params;
    const studentId=req.user.id;
     
    if (!req.file) {
        throw new Error("Please upload a PDF file using the 'myFile' key.");
    }

    const fileId = await uploadAssignmentFile(req);

    const result = await assignmentResultModel.create({
        student:studentId,
        course:courseId,
        assignment:assignmentId,
        file: fileId,
        marks:req.body.marks
    });

    res.status(201).json(new AppResponse(result, "result Added"));

})


export const searchResult=funcWrapper(async (req,res)=>{

    const { courseId,assignmentId } = req.params;
    const studentID=req.user.id;

          const result=await assignmentResultModel.find({student:studentID,course:courseId,assignment:assignmentId});

          if(!result){
            res.status(400).json("not found");
          }
      
          console.log(result);
          res.status(200).json(new AppResponse(result, "found"));

})


export const deleteResult=funcWrapper(async (req,res)=>{
   
    const { courseId,assignmentId } = req.params;
    const studentID=req.user.id;

    const deleted=await assignmentResultModel.findOneAndDelete({student:studentID,course:courseId,assignment:assignmentId});
    if ( ! deleted ) {
            return new ErrorResponse(404, "problem while deleting");
    }


    const filecount = await assignmentResultModel.countDocuments({ file: deleted.file });
    
        if (filecount === 0) {
            await FileModel.deleteOne({ _id: deleted.file });
        }
        res.status(200).json(new AppResponse(deleted, "Assignment Deleted"));

})


export const giveMarks=funcWrapper(async (req,res)=>{
    const { courseId,assignmentId } = req.params;
    const { studentID } = req.query;
    const instructorId = req.user.id;

    const validInstructor=await courseModel.findOne({instructor:instructorId,_id:courseId});
    if(!validInstructor){
        throw new ErrorResponse(404, "Only valid instructors can give marks")
    }

    const updated = await assignmentResultModel.findOneAndUpdate(
        {student:studentID,course:courseId,assignment:assignmentId},
        req.body,
        { new: true, runValidators: true }
    );
    
    if (!updated) {
        return new ErrorResponse(404, "problem updating marks");
    }
    res.status(200).json(new AppResponse(null, "marks Updated"));
})
