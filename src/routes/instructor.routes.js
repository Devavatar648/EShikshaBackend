import express from 'express';
import {createCourse,getCourses, updateCourse, deleteCourse} from '../controller/course.controller.js';
import validSchema from '../validators/course.validator.js';
import assignmentRouter from '../routes/assignment.routes.js';

const router=express.Router();

router.use("/course/assignment", assignmentRouter);

router.route("/course")
    .post( validSchema, createCourse )

router.route("/course/:id")
    .patch( updateCourse )
    .delete( deleteCourse );

export default router;