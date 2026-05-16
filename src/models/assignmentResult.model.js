import mongoose from "mongoose"

const AssignmentResultSchema = new mongoose.Schema({
    student: {
        type: mongoose.Types.ObjectId,
        ref: 'users',
        required: true,

    },
    course: {
        type: mongoose.Types.ObjectId,
        ref: 'courses',
        required: true,
    },
    assignment: {
        type: mongoose.Types.ObjectId,
        ref: 'assignment',
        rquired: true
    },
    file: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    marks: {
        type: Number,
        default:0
    }
})

AssignmentResultSchema.index({course:1,student:1,assignment:1},{unique:true});

export default mongoose.model('resultAssignment', AssignmentResultSchema);
