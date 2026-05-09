import express from 'express';
import env from 'dotenv';
import cors from 'cors';
import userRouter from './src/routes/user.routes.js';
import adminRouter from './src/routes/admin.routes.js';
import fileRouter from './src/routes/file.routes.js';
import { errorHandler } from './src/middleware/errorHandler.middleware.js';
import { adminRequestHandler } from './src/middleware/adminRequestHandler.middleware.js';
import  assignmentRoutes  from './src/routes/assignment.routes.js'


env.config();

const app = express();

// app configuration
app.use( express.json() );
app.use( express.urlencoded( { extended:true } ) );
app.use( cors( { origin: process.env.ORIGIN_URL } ) );

// api endpoints
// user endpoints
app.use("/user", userRouter);
// Admin endpoints
app.use("/admin", adminRequestHandler, adminRouter);

app.use('/instructor',assignmentRoutes);
app.use('/file',fileRouter);


// ErrorHandler Middleware
app.use( errorHandler );

export default app;