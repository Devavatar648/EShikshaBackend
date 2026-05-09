import express from 'express';
import { downloadAssignmentFile, uploadAssignmentFile } from '../controller/fileHandle.controller';
import multer from 'multer';

const router = express.Router;

// const storage = multer.memoryStorage();
// const upload = multer({
//     storage,
//     limit: 5 * 1024 * 1024
// });


// router.get('/upload', upload.single('myFile'), uploadAssignmentFile);
router.get('/download', downloadAssignmentFile);

export default router;