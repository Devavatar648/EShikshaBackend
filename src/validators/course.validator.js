import  {body} from 'express-validator';

const validSchema = [
    body('title')
    .notEmpty().withMessage("Name is required")
    .isLength({min:5}).withMessage("Minimum title length is 5"),

    body('category')
    .notEmpty().withMessage("Category is required")
    .isIn(["professional","beginner","advanced"]).withMessage("choose a valid category"),

    body('description')
    .notEmpty().withMessage("Description is needed")
    .isLength({min:100}).withMessage("At least 100 characters in description"),

    body('instructor')
    .custom((_, {req})=>{
        if(!req.user.id){
            throw new Error("Instructor Authentication required");
        }
        return true;
    })

]

export default validSchema;