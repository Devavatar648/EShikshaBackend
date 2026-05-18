import express from 'express';
import { createCourse, updateCourse, deleteCourse } from '../controller/course.controller.js';
import validSchema from '../validators/course.validator.js';
import multer from 'multer';
import { assignmentValidators } from '../validators/assignment.validator.js';
import { addAssignment, deleteAssignment, searchAssignment, updateAssignment } from '../controller/assignment.controller.js';
import { addQuiz, deleteQuiz, updateQuiz, getQuizes } from '../controller/quiz.controller.js';
import { downloadAssignmentFile } from '../controller/fileHandle.controller.js';
import { deleteResult, giveMarks, searchResults } from '../controller/assignmentResult.controller.js';

const router = express.Router();

const storage = multer.memoryStorage();
const uploading = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 } // 5mb limit
});



//assignments
router.route("/course/:courseId/assignment")
    .post(assignmentValidators, uploading.single('myFile'), addAssignment)
    .get(searchAssignment);

router.route("/course/:courseId/assignment/:id")
    .delete(deleteAssignment)
    .patch(assignmentValidators, uploading.single('myFile'), updateAssignment);

router.route("/course")
    .post(validSchema, createCourse)

router.route("course/:courseId/course/:id")
    .patch(updateCourse)
    .delete(deleteCourse);


// Decoupled from the parent composite route to target the submission directly by its individual ID
router.route("/course/:courseId/assignment-result/:resultId")
    .patch(giveMarks)                                // Instructor updates marks
    .delete(deleteResult);


router.route("/course/:courseId/assignment/:assignmentId/result")   
    .get(searchResults);

//downloading
router.route("/course/:courseId/assignment/download/:id").get(downloadAssignmentFile);


//quizes
router.route("/course/:courseId/quiz")
    .post(addQuiz)
    .get(getQuizes)

router.route("/course/:courseId/quiz/:id")
    .delete(deleteQuiz)
    .patch(updateQuiz);


export default router;