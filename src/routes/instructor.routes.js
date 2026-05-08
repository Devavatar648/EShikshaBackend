import express from 'express';
import {createCourse,getCourses, updateCourse, deleteCourse} from '../controller/course.controller.js';
import validSchema from '../validators/course.validator.js';

const router=express.Router();

router.post("/course", validSchema, createCourse )

router.route("/course/:id")
    .patch( updateCourse )
    .delete( deleteCourse );

export default router;