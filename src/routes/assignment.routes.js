import express from 'express';
import multer from 'multer';
import {
  addAssignment,
  searchAssignment,
  deleteAssignment,
  updateAssignment
} from '../controller/assignment.controller.js';
import { assignmentValidators } from '../validators/assignment.validator.js';

const router = express.Router();

const storage = multer.memoryStorage();
const uploading = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5mb limit
});

router.route("/")
  .post(assignmentValidators, uploading.single('myFile'), addAssignment)
  .get(searchAssignment);

router.route("/:id")
  .delete(deleteAssignment)
  .patch(assignmentValidators, uploading.single('myFile'), updateAssignment);


export default router;
