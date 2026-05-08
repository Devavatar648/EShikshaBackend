import express from 'express';
import { getAllUser } from '../controller/admin.controller.js';

const router = express.Router();
// admin endpoints
router.get("/users", getAllUser);

export default router;