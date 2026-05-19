import express from 'express';
import { 
    publishAnnocement, 
   deleteAnnouncement
} from '../controller/annocements.controller.js'; 

// Middleware imports (Jaise tumne authorization verify karne ke liye banaya hoga)


const router = express.Router();

// 1. POST Request: Announcement create karne ke liye
// Path: /api/announcements
router.post('/', publishAnnocement);

// 2. DELETE Request: Specific announcement delete karne ke liye (Dynamic ID pass hogi)
// Path: /api/announcements/:id
router.delete('/:id', deleteAnnouncement);

export default router;