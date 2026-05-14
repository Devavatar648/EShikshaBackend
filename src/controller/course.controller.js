import { funcWrapper } from "../util/wraperFunction.js";
import Course from "../models/course.model.js";
import validSchema from 'express-validator';
import { Types } from "mongoose";
import courseModel from "../models/course.model.js";
import { AppResponse } from "../util/AppResponse.js";
import { ErrorResponse } from "../util/ErrorResponse.js";
import { getCourseAssignments } from "./assignment.controller.js";



// public
export const getCourses = funcWrapper(async (req, res) => {
    const { instructor, title } = req.query;
    let pageSize = req.query.pageSize || 5;
    let pageNumber = req.query.pageNumber || 1;
    let queryObj = {};
    if(instructor) {
        queryObj['instructor'] = instructor;
    }
    if (title) {
        queryObj['title'] = { $regex:title, $options:'i' };
    }
    const courses = await courseModel.find(queryObj).sort({title:1}).populate("instructor", "name")
                        .skip((pageNumber-1)*pageSize).limit(pageSize);
    if (!courses) {
        throw new ErrorResponse(404, "No Course Found");
    }
    res.status(200).json(new AppResponse(courses, "Course found"));
})


export const getCourseById = funcWrapper(async (req, res) => {
    const { courseId } = req.params;
    const course = await courseModel.findById(courseId).populate("instructor", "name email");
    if (!course) {
        throw new ErrorResponse(404, "No Course Found");
    }
    const assignments = await getCourseAssignments(course._id);
    const response = {course, assignments}
    res.status(200).json(new AppResponse(response, "Course found"));
})


// Protected
export const createCourse = funcWrapper(async (req, res) => {
    const valid = validSchema.validationResult( req );
    if (!valid.isEmpty()) {
        throw valid.array();
    }

    let course = new Course({
        ...req.body,
        instructor: new Types.ObjectId(req.user.id)
    });
    course = await course.save();
    res.status(201).json(new AppResponse(course, "Course created successfully."));

})


export const updateCourse = funcWrapper(async (req, res) => {
    const id = req.params.id;
    const course = await courseModel.findOneAndUpdate({ _id: id, instructor: req.user.id }, { $set: req.body }, {
        runValidators: true,
        new: true,
        context: 'query'
    });

    if (!course) {
        throw "This course is not exists or created by you";
    }

    res.status(200).json(new AppResponse(course, "Course created successfully."));
})


export const deleteCourse = funcWrapper(async (req, res) => {
    const id = req.params.id;
    const course = await courseModel.deleteOne({ _id: id, instructor: req.user.id });
    console.log(course);
    if (course.deletedCount === 0) {
        throw "This course is not exists or created by you";
    }
    res.status(200).json(course);
})

