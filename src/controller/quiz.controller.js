import quizModel from '../models/quiz.model.js';
import { funcWrapper } from '../util/wraperFunction.js';


export const addQuiz = funcWrapper( async (req, res, next) => {
        const { questions, perQuestionMark} = req.body;
        if (!questions || questions.length === 0) {
            res.status(400).json("A quiz must have at least one question.");
        }

        req.body.totalMarks=perQuestionMark*questions.length;
        
        const newQuiz = await new quizModel(req.body).save();

        res.status(201).json({
            message: "Quiz created successfully!",
            data: newQuiz
        });
})

export const getQuiz = funcWrapper(async (req, res, next) => {

        const quizes = await quizModel.find().sort({ createdAt: -1 });

        res.status(200).json({
            count: quizes.length,
            data: quizes
        });
    } )

export const searchQuiz =funcWrapper(async (req, res, next) => {
    
        const { c_id } = req.params.course;
        const i_id=req.user.id;
        
        if(!c_id){
            const quiz = await quizModel.findById(i_id);
        }else{
            const quiz = await quizModel.findById(c_id,i_id);
        }
        
        if (!quiz) {
            return next(new MyError("Quiz not found", 404));
        }

        res.status(200).json({
            success: true,
            data: quiz
        });

    
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
