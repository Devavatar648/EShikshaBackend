import Enrollments from '../models/enrollment.model.js';
import { AppResponse } from '../util/AppResponse.js';
import { ErrorResponse } from '../util/ErrorResponse.js';
import { funcWrapper } from '../util/wraperFunction.js';

export const enrollment=async(req,res,next)=>{
    const courseId=req.params.courseId;
    try{
        const enroll= await new Enrollments({student:req.user.id, course:courseId}).save();
        console.log(enroll);

        if(!enroll){
            throw new ErrorResponse(400,"Something went wrong");
        }
        res.status(201).json(new AppResponse(null,`Successfully enrolled!`));
    }
    catch(err){
        next({statusCode:400,message:err.message||err});
    }
}

export const showEnrolledCourses=funcWrapper(async(req,res)=>{
   
    
        let queryObj={'student':req.user.id};
        if(req.params.courseId){
            queryObj['course']=req.params.courseId;
        }
        const enrolledCourse= await Enrollments.find(queryObj).populate("course").populate("student");
        if(!enrolledCourse){
            throw new ErrorResponse(404,"NO course found")
        }
        res.status(200).json(new AppResponse(enrolledCourse,"Your enrolled Course-"));
})

export const updatedCourseInfo=async(courseId, studentId, updateField, fieldId)=>{
    try{

        if(updateField=="assignent"){
            await Enrollments.findOneAndUpdate({course:courseId,student:studentId},{$set:{attendedAssignments:{$push:fieldId}}});
        }else{
            await Enrollments.findOneAndUpdate({course:courseId,student:studentId},{$set:{attendedQuizes:{$push:fieldId}}});
        }
    }catch(err){
        throw err;
    }
    
}