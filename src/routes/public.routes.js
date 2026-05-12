import express from 'express';
import { getCourseById, getCourses } from '../controller/course.controller.js';


const router = express.Router();

router.get("/course", getCourses);
router.get("/course/:courseId", getCourseById)

export default router;