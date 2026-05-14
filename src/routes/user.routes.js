import express from 'express';
import { updateUserSettings } from '../controller/user.controller.js';

const router = express.Router();


router.route("/settings")
    .patch( updateUserSettings )

export default router;