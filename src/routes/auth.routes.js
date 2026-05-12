import express from 'express';
import { authenticateUser, registerUser } from '../controller/auth.controller.js';
import { registrationValidators } from '../validators/registration.validator.js';

const router = express.Router();
// authentication endpoints
router.post("/login", authenticateUser);
router.post("/register", registrationValidators, registerUser);

export default router;