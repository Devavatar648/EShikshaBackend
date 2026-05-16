import express from 'express';
import { getCourseById } from '../controller/course.controller.js';
import { enrollment, showEnrolledCourses } from '../controller/enrollment.controller.js';
import { getQuizById } from '../controller/quiz.controller.js';
import { addQuizResult } from '../controller/quizResult.controller.js';


const router = express.Router();

// router.get("/course", getCourseById);
router.route("/course/:courseId/enroll")
    .post(enrollment)
    .get(showEnrolledCourses)

router.route("/course/:courseId/quiz/:id")
    .post( addQuizResult )
    .get( getQuizById )
    

export default router;