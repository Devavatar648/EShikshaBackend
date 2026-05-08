import  {body} from 'express-validator';

const validSchema=[
    body('title')
    .notEmpty().withMessage("Name is required")
    .isLength({max:30}).withMessage("Maximum length is 30"),

    body('category')
    .notEmpty().withMessage("Category is required")
    .isIn(["professional","beginner","advanced"]).withMessage("choose a valid category"),

    body('description')
    .notEmpty().withMessage("Description is needed")
    .isLength({min:100}).withMessage("At least 100 characters"),

    body('instructor')
    .notEmpty().withMessage("Instructor is needed")

]

export default validSchema;