import express from 'express';
import { getCourseById } from '../controller/course.controller.js';
import { enrollment, showEnrolledCourses } from '../controller/enrollment.controller.js';


const router = express.Router();

// router.get("/course", getCourseById);
router.route("/course/:courseId/enroll")
    .post(enrollment)
    .get(showEnrolledCourses)
    

export default router;