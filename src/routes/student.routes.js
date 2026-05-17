import express from 'express';
import { enrollment, showEnrolledCourses, deleteEnrollment } from '../controller/enrollment.controller.js';
import { getQuizById } from '../controller/quiz.controller.js';
import { addQuizResult } from '../controller/quizResult.controller.js';


const router = express.Router();

// router.get("/course", getCourseById);
router.route("/course")
    .get( showEnrolledCourses )

// router.route("/course/:courseId")
//     .get( getEnrolledCourse )


router.route("/course/:courseId/enroll")
    .post(enrollment)
    .delete( deleteEnrollment )


router.route("/course/:courseId/quiz/:id")
    .post( addQuizResult )
    .get( getQuizById )
    

export default router;