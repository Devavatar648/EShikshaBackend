import mongoose from 'mongoose';

const QuizSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'courses' 
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    questions: [
        {
            questionText: { type: String, required: true },
            options: {
                type: [String],
                required: true,
                validate: {
                    validator: arr => arr.length === 4,
                    message: 'Options must contain exactly 4 strings.'
                }
            },
            answer: { type: String, required: true },
        }
    ],
    totalMarks: {
        type: Number,
        default: 0
    },
    timeLimit: {
        type: Number,
        required: true,
        min: 1
    },
}, {
    timestamps: true
});



QuizSchema.index({instructor:1,course:1});

export default mongoose.model("quizze", QuizSchema);