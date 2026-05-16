import express from 'express';
import { getUserSettings, updateUserSettings } from '../controller/user.controller.js';

const router = express.Router();


router.route("/settings")
    .get( getUserSettings )
    .patch( updateUserSettings )

export default router;