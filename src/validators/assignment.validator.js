import { body } from "express-validator";

export const assignmentValidators = [

    body('title')
        .isString().withMessage('Title must be a string')
        .notEmpty().withMessage('title needed')
        .isLength({ min: 5 }).withMessage('Title must be at least 5 characters long')
        .trim(),

    body('dueDate')
        .isISO8601().withMessage('Due date must be a valid date')
        .notEmpty().withMessage('due date needed.')
        .toDate(),

    body('totalMarks')
        .isInt({ min: 1 }).withMessage('Total marks must be a positive integer')
        .notEmpty().withMessage('total Marks needed'),

    body('courseId')
        .isMongoId().withMessage('CourseId must be a valid Mongo ObjectId')
        .notEmpty().withMessage('Course Id needed'),

    body('InstructorId')
        .isMongoId().withMessage('InstructorId must be a valid Mongo ObjectId')
        .notEmpty().withMessage('Instructor Id needed.'),

    body('fileId')
        .optional()
        .isMongoId().withMessage('FileId must be a valid Mongo ObjectId if provided')

]