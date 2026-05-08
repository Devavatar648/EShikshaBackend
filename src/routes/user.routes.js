import express from 'express';
import { authenticateUser, registerUser } from '../controller/user.controller.js';
import { registrationValidators } from '../validators/registration.validator.js';

const router = express.Router();
// User endpoints
router.post("/auth", authenticateUser);
router.post("/register", registrationValidators, registerUser);

export default router;