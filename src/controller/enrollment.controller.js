import Enrollments from '../models/enrollment.model.js';
import { AppResponse } from '../util/AppResponse.js';
import { ErrorResponse } from '../util/ErrorResponse.js';
import { funcWrapper } from '../util/wraperFunction.js';
import { getCountCourseAssignmentsAndQuizes } from './course.controller.js';

export const enrollment = funcWrapper(async (req, res) => {
    const courseId = req.params.courseId;
    const enroll = await new Enrollments({ student: req.user.id, course: courseId }).save();
    if (!enroll) {
        throw new ErrorResponse(400, "Something went wrong");
    }
    res.status(201).json(new AppResponse(null, `Successfully enrolled!`));
})

export const showEnrolledCourses = funcWrapper(async (req, res) => {
    let enrolledCourse = await Enrollments.find({ student: req.user.id }).select("course attendedAssignments attendedQuizes").populate({
        path: "course",
        select: "title instructor imageUrl category",
        populate: {
            path: "instructor",
            select: "name"
        }
    });
    enrolledCourse = await Promise.all(
        enrolledCourse.map(async (ec) => {
            ec = ec.toObject();
            const total = await getCountCourseAssignmentsAndQuizes(ec.course._id);
            if(total[0]+total[1]===0){
                ec['completePercentage'] = 0;
            }else{
                ec['completePercentage'] = Math.floor(((ec.attendedAssignments.length+ec.attendedQuizes.length)/(total[0]+total[1]))*100);
            }
            return ec;
        })
    );

    if (!enrolledCourse) {
        throw new ErrorResponse(404, "NO course found")
    }
    res.status(200).json(new AppResponse(enrolledCourse, "Your enrolled Course-"));
})

// export const getEnrolledCourse = funcWrapper(async (req, res) => {
//     const { courseId } = req.params;
//     const enrolledCourse = await Enrollments.findOne({ student: req.user.id, course: courseId }).populate("course");
//     if (!enrolledCourse) {
//         throw new ErrorResponse(404, "No course found");
//     }
//     res.status(200).json(new AppResponse(enrolledCourse, "success"));
// })

export const deleteEnrollment = funcWrapper(async (req, res) => {
    const courseId = req.params.courseId;
    const studentId = req.user.id;

    const deletedEnrollment = await Enrollments.findOneAndDelete({ student: studentId, course: courseId });

    if (!deletedEnrollment) {
        return next(new ErrorResponse(400, "You are not enrolled in this course."));
    }

    res.status(200).json(new AppResponse(null, "Successfully unenrolled from the course!"));

})

export const updatedCourseInfo = async (courseId, studentId, updateField, fieldId) => {
    try {
        if (updateField == "assignment") {
            await Enrollments.findOneAndUpdate({ course: courseId, student: studentId }, { $push: { attendedAssignments: fieldId } });
        } else {
            await Enrollments.findOneAndUpdate({ course: courseId, student: studentId }, { $push: { attendedQuizes: fieldId  } });
        }
    } catch (err) {
        throw err;
    }

}