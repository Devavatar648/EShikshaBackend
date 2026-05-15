import Enrollments from '../models/enrollment.model.js';
import quizModel from '../models/quiz.model.js';
import { AppResponse } from '../util/AppResponse.js';
import { ErrorResponse } from '../util/ErrorResponse.js';
import { funcWrapper } from '../util/wraperFunction.js';


export const addQuiz = funcWrapper( async (req, res) => {
    const { questions, perQuestionMark} = req.body;
    const { courseId } = req.params;
    if (!questions || questions.length === 0) {
        throw "A quiz must have at least one question.";
    }

    req.body.course=courseId;
    req.body.instructor=req.user.id;
    req.body.totalMarks=perQuestionMark*questions.length;
    
    const newQuiz = await new quizModel(req.body).save();

    res.status(201).json(new AppResponse(newQuiz, "Quiz created successfully!"));
})

export const getQuizes = funcWrapper(async (req, res) => {
    let query = {instructor: req.user.id};
    const { courseId } = req.params;
    if(courseId){
        query['course']=courseId;
    }
    const quizes = await quizModel.find(query).sort({ createdAt: -1 }).select("title totalMarks timeLimit dueDate");
    res.status(200).json(new AppResponse(quizes));
} )

export const getQuizById = funcWrapper(async (req, res)=>{
    const {courseId, id} = req.params;
    if(!courseId || !id){
        throw "Invalid path";
    }
    const isEnrolled = await Enrollments.findOne().select("_id");
    if(!isEnrolled){
        throw new ErrorResponse(404, "This page is not exists or Invalid url");
    }
    const quiz = await quizModel.findOne({course:courseId,_id:id}).populate("course", "title").populate("instructor", "name");
    if(!quiz){
        throw new ErrorResponse(404, "This page is not exists or Invalid url");
    }
    res.status(200).json(new AppResponse(quiz, "success"));
})


export const deleteQuiz =funcWrapper( async (req, res, next) => {
        const { id } = req.params;

        const quiz = await quizModel.findById(id);

        if (!quiz) {
            return next(new MyError("Quiz not found", 404));
        }

        await quizModel.findByIdAndDelete(id);

        res.status(200).json({
            message: "Quiz deleted successfully"
        });
})

export const updateQuiz =funcWrapper(async (req, res, next) => {
        const { id } = req.params;
        const quiz = await quizModel.findById(id);

        if (!quiz) {
            return next(new MyError("Quiz not found", 404));
        }
        
        const updatedQuiz = await quizModel.findByIdAndUpdate(
            id,
            { $set:{...req.body} },
            { new: true, runValidators: true }
        );
       
        if (req.body.questions) {
            updatedQuiz.totalMarks = updatedQuiz.questions.reduce((acc, q) => acc + (q.points || 0), 0);
            await updatedQuiz.save();
        }

        res.status(200).json({
            message: "Quiz updated successfully",
            data: updatedQuiz
        });  
}
) 
