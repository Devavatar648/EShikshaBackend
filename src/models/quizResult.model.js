import mongoose from "mongoose";

const quizResultScheema = new mongoose.Schema({
    student:{
        type: mongoose.Types.ObjectId,
        ref: 'users',
        required: true
    },
    course:{
        type: mongoose.Types.ObjectId,
        ref: 'courses',
        required: true
    },
    instructor:{
        type: mongoose.Types.ObjectId,
        ref: 'users',
        required: true
    },
    quiz:{
        type: mongoose.Types.ObjectId,
        ref: 'quizze',
        required: true
    },
    answers:{
        type:[{queston:mongoose.Types.ObjectId, answer:String}],
        required: true
    },
    obtainMarks:{
        type:Number,
        default:0
    },
    timeTaken:{
        type:String,
        required: true
    }
},{
    timestamps:true
})

quizResultScheema.index({instructor:1, course:1, quiz:1});

export default mongoose.model('quizResults', quizResultScheema);