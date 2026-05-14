import express from 'express';
import env from 'dotenv';
import cors from 'cors';
import authRouter from './src/routes/auth.routes.js';
import adminRouter from './src/routes/admin.routes.js';
import publicRouter from "./src/routes/public.routes.js"
import studentRouter from "./src/routes/student.routes.js";
import userRouter from './src/routes/user.routes.js';
import { errorHandler } from './src/middleware/errorHandler.middleware.js';
import { adminRequestHandler } from './src/middleware/adminRequestHandler.middleware.js';
import instructorRouter from './src/routes/instructor.routes.js';
import { instructorRequestHandler } from './src/middleware/instsructorRequestHandler.middleware.js';
import { studnetRequestHandler } from './src/middleware/studetnRequestHandler.middleware.js';
import { userRequestHandler } from './src/middleware/userRequestHandler.middleware.js';

env.config();

const app = express();

// app configuration
app.use( express.json() );
app.use( express.urlencoded( { extended:true } ) );
app.use( cors( { origin: process.env.ORIGIN_URL } ) );

// public api endpoints
app.use("/", publicRouter)
// user endpoints
app.use("/auth", authRouter);


// private api endpoints
// Admin endpoints
app.use("/admin", adminRequestHandler, adminRouter);
// Instructor
app.use("/instructor", instructorRequestHandler, instructorRouter);
// Student
app.use("/student", studnetRequestHandler, studentRouter);
// all user
app.use("/user", userRequestHandler, userRouter)

// ErrorHandler Middleware
app.use( errorHandler );

export default app;