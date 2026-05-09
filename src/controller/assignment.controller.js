import AssignmentModel from '../models/assignment.model.js';
import FileModel from '../models/file.model.js';
import crypto from 'crypto';
import { funcWrapper } from '../util/wraperFunction.js';
import { Response } from '../util/Response.js';
import { uploadAssignmentFile } from './fileHandle.controller.js';


const getHash = (buffer) => {
    return crypto.createHash('sha256').update(buffer).digest('hex');
}


export const addAssignment = funcWrapper(async (req, res) => {
    // Validation for Multer: check if file exists
    if (!req.file) {
        return res.status(400).json({ message: "Please upload a PDF file using the 'myFile' key." });
    }

    // const bufferHash = getHash(req.file.buffer);
    // let file = await FileModel.findOne({ hashedData: bufferHash });

    // if (!file) {
    //     file = await new FileModel({
    //         fileName: req.file.originalname,
    //         fileType: req.file.mimetype,
    //         fileData: req.file.buffer,
    //         hashedData: bufferHash
    //     }).save();
    // }
    uploadAssignmentFile(req,res);

    const added = await AssignmentModel.create({
        ...req.body,
        fileId: file._id
    });

    res.status(201).json({
        message: "Assignment added successfully",
        assignmentId: added._id
    });
})

// export const getAssignment = funcWrapper(async (req, res) => {
//     // We exclude 'fileData' so we don't send heavy buffers in a list view
//     const assignments = await AssignmentModel.find({}).select('-fileData');

//     if (!assignments || assignments.length === 0) {
//         return res.status(200).json({ message: "No assignments found", data: [] });
//     }

//     res.status(200).json(assignments);
// })


export const deleteAssignment = funcWrapper(async (req, res) => {
    const id = req.params.id;
    const deleted = await AssignmentModel.findByIdAndDelete({ _id: id });
    const filecount = await AssignmentModel.countDocuments({ fileId: deleted.fileId });
    if (filecount === 0) {
        await FileModel.deleteOne({ _id: deleted.fileId });
    }
    if (!deleted) {
        return res.status(404).json({ message: "assignment not found" });
    }
    res.status(200).json({ message: 'assignment deleted' });
})


export const searchAssignment = funcWrapper(async (req, res) => {


    const { instructorId, courseId } = req.query;

    const query = {};
    if (instructorId) {
        query['InstructorId'] = instructorId;
    }

    if (courseId) {
        query['courseId'] = courseId;
    }

    const assignment = await AssignmentModel.find(query);

    if (!assignment) {
        return res.status(404).json({ message: "No assignment found" });
    }

    res.status(200).json(assignment);

})


export const updateAssignment = funcWrapper(async (req, res) => {
  const { id } = req.params;

  if (req.file) {
    // const bufferHash = getHash(req.file.buffer);

    
    // let file = await FileModel.findOne({ hashedData: bufferHash });

    // if (!file) {

    //   file = await new FileModel({
    //     fileName: req.file.originalname,
    //     fileType: req.file.mimetype,
    //     fileData: req.file.buffer,
    //     hashedData: bufferHash
    //   }).save();

    // }
    uploadAssignmentFile(req, res);
   
    updateData.fileId = file._id;
  }

 if(req.body){
     const updated = await AssignmentModel.findOneAndUpdate(
       { _id: id },
       req.body,
       { new: true, runValidators: true }
     );
   
     if (!updated) {
       return res.status(404).json({ message: "Assignment not found" });
     }

 }

  res.status(200).json(new Response(null, "Updated"));
});