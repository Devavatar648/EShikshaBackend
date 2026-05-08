import express from 'express';
import multer from 'multer';
import {
  addAssignment,
  getAssignment,
  searchAssignment,
  deleteAssignment,
  updateAssignment
} from '../controller/assignment.controller.js';

const router=express.Router();



const storage=multer.memoryStorage();
const uploading=multer({storage
    // limits: { fileSize: 5 * 1024 * 1024 } // 5mb limit
});


router.post('/addAssignment',uploading.single('myFile'),addAssignment);
router.get('/getAssignment',getAssignment);
router.delete('/:id',deleteAssignment);
router.get('/',searchAssignment);
router.patch('/updateAssignment/:id', uploading.single('myFile'), updateAssignment);


export default router;
