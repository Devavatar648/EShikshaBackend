import express from 'express';
import multer from 'multer';
import {
  addAssignment,
  searchAssignment,
  deleteAssignment,
  updateAssignment
} from '../controller/assignment.controller.js';
import { assignmentValidators } from '../validators/assignment.validator.js';

const router=express.Router();



const storage=multer.memoryStorage();
const uploading=multer({storage
    // limits: { fileSize: 5 * 1024 * 1024 } // 5mb limit
});


router.post('/',assignmentValidators,uploading.single('myFile'),addAssignment);
//router.get('/getAssignment',getAssignment);
router.delete('/:id',deleteAssignment);
router.get('/',searchAssignment);
router.patch('/:id',assignmentValidators,uploading.single('myFile'), updateAssignment);


export default router;
