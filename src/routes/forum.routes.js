import express from 'express';
import { postForum, getAllForums ,postReply} from '../controller/forum.controller.js'; // Ensure correct controller path

const router = express.Router();

// 1. GET ALL POSTS
// Path actual mein banega: GET /api/forum
router.get('/', getAllForums);

// 2. CREATE A NEW THREAD
// Path actual mein banega: POST /api/forum
router.post('/', postForum);
router.post('/:id/reply', postReply);

export default router;