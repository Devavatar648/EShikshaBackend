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
    course: {
        type: mongoose.Types.ObjectId, 
        required: true
    },
    instructor: {
        type: mongoose.Types.ObjectId, 
        required: true
    },
    file:{
        type:mongoose.Types.ObjectId,
        required: true
    }
},{
    timestamps:true
})

export default mongoose.model('assignment', AssignmentSchema);;
