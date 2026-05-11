import express from 'express';
import { downloadAssignmentFile } from '../controller/fileHandle.controller';

const router = express.Router();

router.get('/download', downloadAssignmentFile);

export default router;