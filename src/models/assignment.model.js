import mongoose from 'mongoose';

const AssignmentSchema=new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5
    },
    dueDate: {
        type: Date,
        required: true
    },
    totalMarks: {
        type: Number,
        required: true,
        min: 1
    },
    courseId: {
        type: mongoose.Types.ObjectId, 
        required: true
    },
    InstructorId: {
        type: mongoose.Types.ObjectId, 
        required: true
    },
    fileId:{
        type:mongoose.Types.ObjectId,
    }
},{
    timestamps:true
})

export default mongoose.model('assignment', AssignmentSchema);;
