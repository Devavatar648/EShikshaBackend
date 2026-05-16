import express from 'express';
import { getCourseById } from '../controller/course.controller.js';
import { enrollment, showEnrolledCourses } from '../controller/enrollment.controller.js';
import { downloadAssignmentFile } from '../controller/fileHandle.controller.js';
import { addResult, searchResult } from '../controller/assignmentResult.controller.js';
import { deleteAssignment } from '../controller/assignment.controller.js';
import multer from 'multer';


const router = express.Router();

const storage = multer.memoryStorage();
const uploading = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 } // 5mb limit
});

// router.get("/course", getCourseById);
router.route("/course/:courseId/enroll")
    .post(enrollment)
    .get(showEnrolledCourses)



router.route("/course/:courseeId/assignment/:assignmentId/result")
.post(uploading.single('myFile'),addResult)
.get(searchResult)
.delete(deleteAssignment);



//download
router.route("/course/:courseId/assignment/download/:id").get(downloadAssignmentFile);
    

export default router;