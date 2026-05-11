import { funcWrapper } from "../util/wraperFunction.js";
import Course from "../models/course.model.js";
import validSchema from 'express-validator';
import { Types } from "mongoose";
import courseModel from "../models/course.model.js";



// public
export const getCourses = funcWrapper(async (req, res)=>{
    const instId=req.query.instructorId;
    const cName=req.query.title;
    let queryObj = {};
    if(instId){
        queryObj['instructorId']=instId;
    }
    if(cName){
        queryObj['title']=cName;
    }
    const course=await courseModel.find(queryObj);
    res.status(201).json({message:"Course found",course});
}) 


// Protected
export const createCourse=funcWrapper(async(req, res)=>{
    const valid=validSchema.validationResult(req);
    if(!valid.isEmpty()){
        throw valid.array();
    }

    let course= new Course({
        ...req.body,
        instructorId: new Types.ObjectId(req.body.instructorId)
    });
    course=await course.save();
    res.status(201).json({message:"Course added successfully"});

})


export const updateCourse=funcWrapper(async(req, res)=>{
    const id= req.params.id;
    const { instructor, ...updatedData } = req.body;
    const course=await courseModel.findOneAndUpdate({_id:id, instructor},{$set:updatedData}, {
        runValidators:true,
        new:true,
        context:'query'
    });

    if(!course){
        throw "This course is not exists or created by you";
    }

    res.status(200).json(course);      
})


export const deleteCourse=funcWrapper(async(req, res)=>{
    const id = req.params.id;
    const course=await courseModel.deleteOne({_id:id, instructor:req.body.instructor});
    console.log(course);
    if(course.deletedCount===0){
        throw "This course is not exists or created by you";
    }
    res.status(200).json(course);    
})

