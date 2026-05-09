import express from 'express';
import {createCourse,getCourses, updateCourse, deleteCourse} from '../controller/course.controller.js';
import validSchema from '../validators/course.validator.js';

const router=express.Router();

// router.post("/createCourse", validSchema, createCourse);
router.get("/", getCourses);


// router.patch("/updateCourse/:id", updateCourse);
// router.delete("/deleteCourse/:id",deleteCourse);

export default router;