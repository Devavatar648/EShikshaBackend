import { funcWrapper } from "../util/wraperFunction.js";
import QuizResultModel from "../models/quizResult.model.js";
import { AppResponse } from "../util/AppResponse.js";
import quizModel from "../models/quiz.model.js";
import { Types } from "mongoose";


export const addQuizResult = funcWrapper(async (req, res)=>{
    const {courseId, id} = req.params;
    const studentId = req.user.id;
    const instructorId = req.query.instructor;
    if(!instructorId){
        throw "Instructor id is required."
    }
    const quizData = await quizModel.findOne({_id:id, instructor:instructorId, course:courseId}).select("-_id totalMarks questions");

    const obtainMarks = caluculateObtainMarks(quizData.questions, req.body.answers, quizData.totalMarks);

    const resultData = {
        ...req.body,
        obtainMarks:obtainMarks,
        instructor: instructorId,
        student: studentId,
        course: courseId,
        quiz: id
    }
    const quizResult = await new QuizResultModel(resultData).save();
    if(!quizResult){
        throw "Internal server error";
    }
    res.status(200).json(new AppResponse(null, "Result submitted successfully"));
})

// export const 


const caluculateObtainMarks = (questions, answers, totalMarks)=>{
    let total = 0;
    let marksPerQuestion = totalMarks/questions.length;
    let qdata = questions.map(q=>({id:String(q._id), answer:q.answer}))
    answers.forEach(ans=>{
        let ind = qdata.findIndex(q=>q.id===ans.question);
        if(qdata[ind].answer===ans.answer){
            total+=marksPerQuestion;
        }
    })

    return total;
}