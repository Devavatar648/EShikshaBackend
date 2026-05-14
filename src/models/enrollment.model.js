import { Schema , Types,model} from "mongoose";

const enrollmentSchema= new Schema({
    course:{
        type:Types.ObjectId,
        ref:"courses",
        required:true,
    },
    student:{
        type:Types.ObjectId,
        ref:"users",
        required:true,
    },
    attendedAssignments:{
        type:[Types.ObjectId],
        default:[]
    },
    attendedQuizes:{
        type:[Types.ObjectId],
        default:[]
    }
}, 
{
    timestamps:true
})

enrollmentSchema.index({course:1, student:1},{unique:true});

export default new model("enrollments", enrollmentSchema);

