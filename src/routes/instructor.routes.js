import express from 'express';
import {createCourse, updateCourse, deleteCourse} from '../controller/course.controller.js';
import validSchema from '../validators/course.validator.js';
import multer from 'multer';
import { assignmentValidators } from '../validators/assignment.validator.js';
import { addAssignment, deleteAssignment, searchAssignment, updateAssignment } from '../controller/assignment.controller.js';

const router=express.Router();

const storage = multer.memoryStorage();
const uploading = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5mb limit
});

router.route("/course/:courseId/assignment")
    .post(assignmentValidators, uploading.single('myFile'), addAssignment)
    .get( searchAssignment );

router.route("/course/:courseId/assignment/:id")
    .delete( deleteAssignment )
    .patch(assignmentValidators, uploading.single('myFile'), updateAssignment);

router.route("/course")
    .post( validSchema, createCourse )

router.route("/course/:id")
    .patch( updateCourse )
    .delete( deleteCourse );

export default router;