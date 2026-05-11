import express from 'express';
import { getCourseById } from '../controller/course.controller.js';


const router = express.Router();

router.get("/course", getCourseById);

export default router;